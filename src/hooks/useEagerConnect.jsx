import { useEffect } from 'react'

import { ConnectorNames } from '../config/connectors'
import { ACTIVE_CHAIN_KEY, ACTIVE_CONNECTOR_KEY } from '../config/constants'
import useAuth from './useAuth'

const _binanceChainListener = async () =>
  new Promise((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      }
    })
  )

export const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorName = window.localStorage.getItem(ACTIVE_CONNECTOR_KEY)
    const chainId = parseInt(window.localStorage.getItem(ACTIVE_CHAIN_KEY), 10)

    if (connectorName === ConnectorNames.BSC) {
      const isConnectorBinanceChain = connectorName === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorName, chainId))

        return
      }
    }

    login(connectorName, chainId)
  }, [login])
}
