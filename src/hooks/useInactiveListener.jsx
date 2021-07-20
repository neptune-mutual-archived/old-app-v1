import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

import { wrapperInjectedConnector } from '../utils/blockchain/connectors'

export const useInactiveListener = (suppress = false) => {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      console.log('Registering events ...')

      const handleConnect = (info) => {
        console.log("Handling 'connect' event", info)
        activate(wrapperInjectedConnector)
      }

      ethereum.on('connect', handleConnect)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
        }
      }
    }
  }, [active, error, suppress, activate])
}
