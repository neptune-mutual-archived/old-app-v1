import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'

import { RUN_EVERY } from '../config/constants'
import { useDiscovery } from '../hooks/contracts/useDiscovery'
import { sumOf } from '../utils/bignumbers'
import { getBurnedByChainId } from '../utils/blockchain/burned'

// has data of all stats
export const StatsContext = React.createContext()

export const StatsProvider = ({ children }) => {
  const { active, account, chainId } = useWeb3React()

  const discoveryInstance = useDiscovery()
  const [totalNepSupply, setTotalNepSupply] = useState('0')
  const [totalBurned, setTotalBurned] = useState('0')
  const [nepPrice, setNepPrice] = useState('0')
  const [totalRewardAllocation, setTotalRewardAllocation] = useState('0')

  useEffect(() => {
    setTotalNepSupply('0')
    setTotalBurned('0')
    setNepPrice('0')
    setTotalRewardAllocation('0')
  }, [chainId])

  useEffect(() => {
    const updateStats = async () => {
      let result = await discoveryInstance.totalNepSupply()
      setTotalNepSupply(result)

      result = await discoveryInstance.totalBurned()
      setTotalBurned(sumOf(result, getBurnedByChainId(chainId)))

      result = await discoveryInstance.totalRewardAllocation()
      setTotalRewardAllocation(result)

      result = await discoveryInstance.getNEPPrice()
      setNepPrice(result)
    }

    updateStats()

    const intervalId = setInterval(() => {
      updateStats()
    }, RUN_EVERY)

    return () => clearInterval(intervalId)
  }, [active, account, chainId])

  return (
    <StatsContext.Provider
      value={{
        nepPrice,
        totalNepSupply,
        totalBurned,
        totalRewardAllocation
      }}
    >
      {children}
    </StatsContext.Provider>
  )
}
