import testnet from './pool.testnet'
import mainnet from './pool.mainnet'
import { FALLBACK_CHAIN_ID } from '../constants/chains'

export const getPool = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return testnet
  }

  return mainnet
}

// console.log(getPool(97))
