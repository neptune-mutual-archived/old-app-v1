import { FALLBACK_CHAIN_ID } from './constants/chains'

export const networks = [
  {
    id: 56,
    name: 'Binance Smart Chain Network',
    shortName: 'BSC Mainnet',
    enabledIcon: '/networks/binance.png',
    disabledIcon: '/networks/binance-disabled.png'
  },
  {
    id: 97,
    name: 'Binance Smart Chain Test Network',
    shortName: 'BSC Testnet',
    enabledIcon: '/networks/binance.png',
    disabledIcon: '/networks/binance-disabled.png'
  },
  {
    id: 1,
    name: 'Ethereum',
    enabledIcon: '/networks/ethereum.png',
    disabledIcon: '/networks/ethereum-disabled.png',
    disabled: true
  },
  {
    id: 4,
    name: 'Ethereum Testnet',
    enabledIcon: '/networks/ethereum.png',
    disabledIcon: '/networks/ethereum-disabled.png',
    disabled: true
  }
]

export const getNetwork = (networkId = FALLBACK_CHAIN_ID) => {
  return networks.find((x) => x.id === networkId)
}
