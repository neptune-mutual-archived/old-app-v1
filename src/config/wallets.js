import {
  getBscConnector,
  getInjectedConnector,
  getWalletConnect
} from '../utils/blockchain/connectors'
import { ConnectorNames } from './connectors'

export const wallets = [
  {
    id: '1',
    name: 'MetaMask',
    enabledIcon: '/networks/metamask.svg',
    disabledIcon: '/networks/metamask-disabled.svg',
    connector: getInjectedConnector,
    connectorName: ConnectorNames.Injected
  },
  {
    id: '2',
    name: 'Binance Chain',
    enabledIcon: '/networks/injected-binance.svg',
    disabledIcon: '/networks/injected-binance-disabled.svg',
    connector: getBscConnector,
    connectorName: ConnectorNames.BSC
  },
  {
    id: '3',
    name: 'WalletConnect',
    enabledIcon: '/networks/wallet-connect.svg',
    disabledIcon: '/networks/wallet-connect-disabled.svg',
    connector: getWalletConnect,
    connectorName: ConnectorNames.WalletConnect
  }
]
