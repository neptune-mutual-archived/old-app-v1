import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'

import { getBonds } from '../config/bond'
import { RUN_EVERY } from '../config/constants'
import { useBondContractInfo } from '../hooks/constants/useBondContractInfo'
import { useBond } from '../hooks/contracts/useBond'
import { useDiscovery } from '../hooks/contracts/useDiscovery'
import { hasValue, maxIn, sumOf } from '../utils/bignumbers'
import { getTokenAllowance } from '../utils/blockchain/allowance'
import { isLatest } from '../utils/context'

// has data of all bonds
export const BondsContext = React.createContext()

export const BondsProvider = ({ children }) => {
  const { active, library, account, chainId } = useWeb3React()
  const bondContractInfo = useBondContractInfo()
  const bondInstance = useBond({ contract: bondContractInfo })
  const discoveryInstance = useDiscovery()
  const [summaries, setSummaries] = useState({})
  const [tokenPrices, setTokenPrices] = useState({})
  const [allowances, setAllowances] = useState({})
  const [rewardAllocation, setRewardAllocation] = useState('0')

  const bonds = getBonds(chainId)

  const getMaxAPYFraction = (decimals = 0) => {
    const maxAPY = maxIn(
      Object.values(bonds)
        .filter(Boolean)
        .map((x) => x.apy)
    )
    return maxAPY
  }

  const getSumOfTVL = () => {
    // Todo: get summaries of bonds of current network only
    return sumOf(
      ...Object.values(summaries)
        .filter(Boolean)
        .map((x) => x.tvl)
    )
  }

  const getTotalNepPaired = () => {
    return sumOf(
      ...Object.values(summaries)
        .filter(Boolean)
        .map((x) => x.poolTotalNepPaired)
    )
  }

  const getInfoById = (id) => {
    return bonds.find((x) => x.id === id) || {}
  }

  const getSummaryById = (id) => {
    return summaries[id] || {}
  }

  const getAllowanceById = (id) => {
    return allowances[id] || '0'
  }

  useEffect(() => {
    setSummaries({})
    setAllowances({})
    setTokenPrices({})
  }, [chainId])

  useEffect(() => {
    const updateSummary = async (id, token) => {
      const summary = await discoveryInstance.getBondSummary({
        token,
        account
      })

      setSummaries((prev) => {
        if (isLatest(prev[id], summary)) {
          return { ...prev, [id]: summary }
        }
        return prev
      })
    }

    const updateTokenPrice = async (id, token) => {
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

    const updateAllowance = async (id, token) => {
      if (!active || !account) {
        resetAllowance(id)
        return
      }

      const allowance = await getTokenAllowance({
        library,
        token,
        spender: bondContractInfo.address,
        owner: account
      })

      setAllowances((prev) => ({ ...prev, [id]: allowance }))
    }

    const updateRewardAllocation = async () => {
      const amount = await bondInstance._totalRewardAllocation()
      setRewardAllocation(amount)
    }

    updateRewardAllocation()
    bonds.forEach(({ id, token, bond, live }) => {
      if (!live) {
        return
      }
      updateSummary(id, token)
      updateTokenPrice(id, token)
      updateAllowance(id, token)
    })

    const intervalId = setInterval(() => {
      updateRewardAllocation()
      bonds.forEach(({ id, token, live }) => {
        if (!live) {
          return
        }
        updateSummary(id, token)
        updateTokenPrice(id, token)
        updateAllowance(id, token)
      })
    }, RUN_EVERY)

    return () => clearInterval(intervalId)
  }, [active, account, chainId])

  return (
    <BondsContext.Provider
      value={{
        bonds,
        summaries,
        tokenPrices,
        rewardAllocation,
        getInfoById,
        getSummaryById,
        getAllowanceById,
        getMaxAPYFraction,
        getSumOfTVL,
        getTotalNepPaired
      }}
    >
      {children}
    </BondsContext.Provider>
  )
}
