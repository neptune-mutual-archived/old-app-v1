import { FALLBACK_CHAIN_ID } from './constants/chains'

export const networks = [
  {
    id: 56,
    name: 'Binance Smart Chain',
    shortName: 'BSC Mainnet',
    enabledIcon: <img src='/networks/binance.png' width='48' height='48' />,
    disabledIcon: (
      <img src='/networks/binance-disabled.png' width='48' height='48' />
    )
  },
  {
    id: 97,
    name: 'BSC Testnet',
    shortName: 'BSC Testnet',
    enabledIcon: <img src='/networks/binance.png' width='48' height='48' />,
    disabledIcon: (
      <img src='/networks/binance-disabled.png' width='48' height='48' />
    )
  },
  {
    id: 1,
    name: 'Ethereum',
    enabledIcon: <img src='/networks/ethereum.png' width='48' height='48' />,
    disabledIcon: (
      <img src='/networks/ethereum-disabled.png' width='48' height='48' />
    ),
    disabled: true
  },
  {
    id: 4,
    name: 'Ethereum Testnet',
    enabledIcon: <img src='/networks/ethereum.png' width='48' height='48' />,
    disabledIcon: (
      <img src='/networks/ethereum-disabled.png' width='48' height='48' />
    ),
    disabled: true
  }
]

export const getNetwork = (networkId = FALLBACK_CHAIN_ID) => {
  return networks.find((x) => x.id === networkId)
}
