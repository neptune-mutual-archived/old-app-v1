import BigNumber from 'bignumber.js'
import chains, { FALLBACK_CHAIN_ID } from '../../config/constants/chains'
import { sumOf } from '../bignumbers'

export const getBurnedByChainId = (networkId = FALLBACK_CHAIN_ID) => {
  try {
    const network = chains.find((x) => x.networkId === networkId)
    return sumOf(...network.tokenBurns.map((x) => x.amount))
  } catch (error) {
    console.log('Could not get burned amount for', networkId)
  }

  return new BigNumber(0)
}
