import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers'

import { POLLING_INTERVAL } from '../config/constants/connectors'
import getNodeUrl from './blockchain/getRpcUrl'

// Fallback Provider
export const getProvider = () => {
  const rpcUrl = getNodeUrl()
  const library = new JsonRpcProvider(rpcUrl)

  library.pollingInterval = POLLING_INTERVAL
  return library
}

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider)

  library.pollingInterval = POLLING_INTERVAL
  return library
}
