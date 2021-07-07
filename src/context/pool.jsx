import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'

import { RUN_EVERY } from '../config/constants'
import { getPool } from '../config/pool'
import { useFarmContractInfo } from '../hooks/constants/useFarmContractInfo'
import { useNEPToken } from '../hooks/constants/useNEPToken'
import { usePoolContractInfo } from '../hooks/constants/usePoolContractInfo'
import { useDiscovery } from '../hooks/contracts/useDiscovery'
import { useERC20 } from '../hooks/contracts/useERC20'
import { useStatsContext } from '../hooks/useStatsContext'
import { convertFromUnits, hasValue, maxIn, sumOf } from '../utils/bignumbers'
import { getTokenAllowance } from '../utils/blockchain/allowance'
import { isLatest } from '../utils/context'
import { getPoolData } from '../utils/data/pool'

// has data of all pools
export const PoolContext = React.createContext()

export const PoolProvider = ({ children }) => {
  const { active, library, account, chainId } = useWeb3React()

  const [summaries, setSummaries] = useState({})
  const [allowances, setAllowances] = useState({})
  const [tokenPrices, setTokenPrices] = useState({})
  const [totalNEPLocked, setTotalNEPLocked] = useState('0')
  const { nepPrice } = useStatsContext()
  const { token: neptoken } = useNEPToken()

  const { address: poolContractAddress } = usePoolContractInfo()
  const { address: farmContractAddress } = useFarmContractInfo()
  const discoveryInstance = useDiscovery()

  const pools = getPool(chainId)
  const { balanceOf } = useERC20({ contract: neptoken })

  const getInfoById = (id) => {
    return pools.find((x) => x.id === id) || {}
  }

  const getSummaryById = (id) => {
    return summaries[id] || {}
  }

  const getAllowanceById = (id) => {
    return allowances[id] || '0'
  }

  const getTVLById = (id, info, summary) => {
    let tvl = new BigNumber(0)

    if (
      info.nepRewardAllocation &&
      hasValue(info.nepRewardAllocation.toString())
    ) {
      tvl = tvl.plus(info.nepRewardAllocation.multipliedBy(nepPrice || 0))
    } else {
      return hasValue(summary.tvl)
        ? new BigNumber(summary.tvl)
        : new BigNumber(0)
    }

    if (hasValue(summary.totalTokensLocked)) {
      tvl = tvl.plus(
        new BigNumber(summary.totalTokensLocked.toString()).multipliedBy(
          convertFromUnits(tokenPrices[id] || 0)
        )
      )
    }

    if (hasValue(summary.totalNepRewards)) {
      tvl = tvl.minus(
        new BigNumber(summary.totalNepRewards.toString()).multipliedBy(
          convertFromUnits(nepPrice || 0)
        )
      )
    }

    return tvl
  }

  const getDataById = (id) => {
    const info = getInfoById(id)
    const summary = getSummaryById(id)
    const allowance = getAllowanceById(id)
    const tvl = getTVLById(id, info, summary)

    return getPoolData(info, summary, allowance, tvl)
  }

  const getMaxAPYFraction = (decimals = 0) => {
    const maxAPY = maxIn(
      Object.values(summaries)
        .filter(Boolean)
        .map((x) => convertFromUnits(x.apy).toNumber())
    )
    return maxAPY
  }

  const getSumOfTVL = () => {
    return sumOf(
      ...pools.map((x) =>
        getTVLById(x.id, getInfoById(x.id), getSummaryById(x.id)).toString()
      )
    )
  }

  const getSumOfNEPLocked = async () => {
    const b1 = await balanceOf(poolContractAddress)
    const b2 = await balanceOf(farmContractAddress)
    return new BigNumber(b1).plus(b2).toString()
  }

  useEffect(() => {
    setSummaries({})
    setAllowances({})
    setTokenPrices({})
    setTotalNEPLocked('0')
  }, [chainId])

  useEffect(() => {
    const updateTotalNEPLocked = async () => {
      const result = await getSumOfNEPLocked()
      setTotalNEPLocked(result)
    }

    const updateSummary = async (id, token, discovery, type, isLPToken) => {
      const summary = await discoveryInstance.getFarmOrPoolSummary({
        type,
        token,
        isLPToken,
        account
      })

      setSummaries((prev) => {
        if (isLatest(prev[id], summary)) {
          return { ...prev, [id]: summary }
        }
        return prev
      })
    }

    const updateTokenPrice = async (id, token, discovery) => {
      const price = await discoveryInstance.getTokenAmountInBUSD({ token })

      setTokenPrices((prev) => {
        return { ...prev, [id]: price }
      })
    }

    const resetAllowance = (id) => {
      if (allowances[id] && hasValue(allowances[id])) {
        setAllowances((prev) => ({ ...prev, [id]: '0' }))
      }
    }

    const updateAllowance = async (id, token, farm) => {
      if (!active || !account) {
        resetAllowance(id)
        return
      }

      const allowance = await getTokenAllowance({
        library,
        token,
        spender: farm.address,
        owner: account
      })

      setAllowances((prev) => ({ ...prev, [id]: allowance }))
    }

    pools.forEach(({ id, token, discovery, farm, type, isLPToken, live }) => {
      if (!live) {
        return
      }
      updateSummary(id, token, discovery, type, isLPToken)
      updateAllowance(id, token, farm)
      updateTokenPrice(id, token, discovery)
      updateTotalNEPLocked()
    })

    const intervalId = setInterval(() => {
      pools.forEach(({ id, token, discovery, farm, type, isLPToken, live }) => {
        if (!live) {
          return
        }
        updateSummary(id, token, discovery, type, isLPToken)
        updateAllowance(id, token, farm)
        updateTokenPrice(id, token, discovery)
        updateTotalNEPLocked()
      })
    }, RUN_EVERY)

    return () => clearInterval(intervalId)
  }, [active, account, chainId])

  return (
    <PoolContext.Provider
      value={{
        pools,
        summaries,
        tokenPrices,
        totalNEPLocked,
        getDataById,
        getTVLById,
        getInfoById,
        getSummaryById,
        getAllowanceById,
        getMaxAPYFraction,
        getSumOfTVL
      }}
    >
      {children}
    </PoolContext.Provider>
  )
}
