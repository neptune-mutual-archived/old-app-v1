import BigNumber from 'bignumber.js'
import { FALLBACK_CHAIN_ID } from '../../config/constants/chains'
import { getBurnedData } from '../../config/constants/tokenBurns'
import { sumOf } from '../bignumbers'

export const getBurnedByChainId = (networkId = FALLBACK_CHAIN_ID) => {
  try {
    const tokenBurns = getBurnedData(networkId)
    return sumOf(...tokenBurns.map((x) => x.amount))
  } catch (error) {
    console.log('Could not get burned amount for', networkId)
  }

  return new BigNumber(0)
}
