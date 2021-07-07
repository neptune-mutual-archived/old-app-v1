import {
  getBscConnector,
  getInjectedConnector,
  getWalletConnect
} from '../utils/blockchain/connectors'

export const wallets = [
  {
    id: '1',
    name: 'MetaMask',
    enabledIcon: <img src='/networks/metamask.svg' height={48} width={48} />,
    disabledIcon: (
      <img src='/networks/metamask-disabled.svg' height={48} width={48} />
    ),
    connector: getInjectedConnector
  },
  {
    id: '2',
    name: 'Binance Chain',
    enabledIcon: (
      <img src='/networks/injected-binance.svg' height={48} width={48} />
    ),
    disabledIcon: (
      <img
        src='/networks/injected-binance-disabled.svg'
        height={48}
        width={48}
      />
    ),
    disabled: true,
    connector: getBscConnector
  },
  {
    id: '3',
    name: 'WalletConnect',
    enabledIcon: (
      <img src='/networks/wallet-connect.svg' height={48} width={48} />
    ),
    disabledIcon: (
      <img src='/networks/wallet-connect-disabled.svg' height={48} width={48} />
    ),
    disabled: true,
    connector: getWalletConnect
  }
]
