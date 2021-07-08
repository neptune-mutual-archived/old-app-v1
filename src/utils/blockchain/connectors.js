import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'

import { networks } from '../../config/networks'
import rpcUrls from '../../config/constants/rpcUrls'
import { POLLING_INTERVAL } from '../../config/constants/connectors'
import { ConnectorNames } from '../../config/connectors'

const supportedChainIds = networks.filter((x) => !x.disabled).map((x) => x.id)

export const wrapperInjectedConnector = new InjectedConnector({
  supportedChainIds
})

export const getInjectedConnector = (chainId) => {
  const supportedChainIds = [chainId]
  const connector = new InjectedConnector({ supportedChainIds })

  return connector
}

export const getBscConnector = (chainId) => {
  const bscConnector = new BscConnector({ supportedChainIds: [chainId] })

  return bscConnector
}

export const getWalletConnect = (chainId) => {
  const rpcUrl = rpcUrls[chainId]

  const walletconnect = new WalletConnectConnector({
    rpc: { [chainId]: rpcUrl },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
  })

  return walletconnect
}

export const getConnectorByName = (name, chainId) => {
  if (!chainId) return null

  switch (name) {
    case ConnectorNames.Injected:
      return getInjectedConnector(chainId)

    case ConnectorNames.BSC:
      return getBscConnector(chainId)

    case ConnectorNames.WalletConnect:
      return getWalletConnect(chainId)

    default:
      return null
  }
}
