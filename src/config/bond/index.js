import testnet from './bond.testnet'
import mainnet from './bond.mainnet'
import { FALLBACK_CHAIN_ID } from '../constants/chains'

/**
 *
 * @param {number?} networkId
 * @returns {Array}
 */
export const getBonds = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return testnet
  }

  return mainnet
}
