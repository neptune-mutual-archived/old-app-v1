import { FALLBACK_CHAIN_ID } from '../../config/constants/chains'
import rpcUrls from '../../config/constants/rpcUrls'
import { getOne } from '../random'

// Manual - if no metamask or wallet connected
const getNodeUrl = (chainId) => {
  const nodes = rpcUrls[chainId || FALLBACK_CHAIN_ID]

  return getOne(...nodes)
}

export default getNodeUrl
