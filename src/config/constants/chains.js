import rpcUrls from './rpcUrls'

const configured = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)

export const FALLBACK_CHAIN_ID = configured || 56

const chains = [
  {
    networkId: 56,
    chainId: `0x${(56).toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: rpcUrls[`${56}`],
    blockExplorerUrls: ['https://bscscan.com/']
  },
  {
    networkId: 97,
    chainId: `0x${(97).toString(16)}`,
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: rpcUrls[`${97}`],
    blockExplorerUrls: ['https://testnet.bscscan.com/']
  }
]

export default chains
