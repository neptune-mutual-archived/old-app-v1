import { FALLBACK_CHAIN_ID } from './constants/chains'

export const networks = [
  {
    id: 56,
    name: 'Binance Smart Chain Network',
    displayName: 'Binance',
    shortName: 'BSC Mainnet',
    enabledIcon: '/networks/binance.png',
    disabledIcon: '/networks/binance-disabled.png'
  },
  {
    id: 97,
    name: 'Binance Smart Chain Test Network',
    displayName: 'Binance Testnet',
    shortName: 'BSC Testnet',
    enabledIcon: '/networks/binance.png',
    disabledIcon: '/networks/binance-disabled.png'
  },
  {
    id: 1,
    name: 'Ethereum',
    displayName: 'Ethereum',
    enabledIcon: '/networks/ethereum.png',
    disabledIcon: '/networks/ethereum-disabled.png',
    disabled: true
  },
  {
    id: 4,
    name: 'Ethereum Testnet',
    displayName: 'Ethereum Testnet',
    enabledIcon: '/networks/ethereum.png',
    disabledIcon: '/networks/ethereum-disabled.png',
    disabled: true
  }
]

export const getNetwork = (networkId = FALLBACK_CHAIN_ID) => {
  return networks.find((x) => x.id === networkId)
}
