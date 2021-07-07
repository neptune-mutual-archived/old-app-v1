import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

import { getConnector, setupNetwork } from '../utils/wallet'
import useActivatingConnector from './useActivatingConnector'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const [_, setActivatingConnector] = useActivatingConnector() // eslint-disable-line no-unused-vars

  const connect = (networkId, walletId) => {
    const connector = getConnector(walletId, networkId)

    setActivatingConnector(connector)
    activate(connector, async (error) => {
      if (error instanceof UnsupportedChainIdError) {
        const hasSetup = await setupNetwork(networkId)
        if (hasSetup) {
          activate(connector)
        }
      } else {
        console.error(error)
      }
    })

    return true
  }

  const disconnect = () => {
    deactivate()
  }

  return { connect, disconnect }
}

export default useAuth
