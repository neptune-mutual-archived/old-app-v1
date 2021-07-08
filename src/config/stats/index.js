import * as testnet from '../constants/addresses.bsc-testnet'
import * as mainnet from '../constants/addresses.bsc-mainnet'
import abis from '../abis'
import { FALLBACK_CHAIN_ID } from '../constants/chains'

export const getDiscoveryContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      address: testnet.addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    }
  }

  return {
    address: mainnet.addresses.contracts.v1.DISCOVERY,
    abi: abis.discovery
  }
}

export const getBondContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return { address: testnet.addresses.contracts.v1.BOND, abi: abis.bond }
  }

  return { address: mainnet.addresses.contracts.v1.BOND, abi: abis.bond }
}

export const getPoolContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return { address: testnet.addresses.contracts.v1.POOL, abi: abis.pool }
  }

  return { address: mainnet.addresses.contracts.v1.POOL, abi: abis.pool }
}

export const getFarmContractInfo = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return { address: testnet.addresses.contracts.v1.FARM, abi: abis.farm }
  }

  return { address: mainnet.addresses.contracts.v1.FARM, abi: abis.farm }
}

export const getNEPToken = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      address: testnet.addresses.tokens.NEP,
      explorer: `https://testnet.bscscan.com/token/${testnet.addresses.tokens.NEP}`,
      abi: abis.ierc20
    }
  }

  return {
    address: mainnet.addresses.tokens.NEP,
    explorer: `https://bscscan.com/token/${mainnet.addresses.tokens.NEP}`,
    abi: abis.ierc20
  }
}

export const getExplorer = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      name: 'BscScan',
      tx: 'https://testnet.bscscan.com/tx/%s',
      address: 'https://testnet.bscscan.com/address/%s',
      token: 'https://testnet.bscscan.com/token/%s'
    }
  }

  return {
    name: 'BscScan',
    tx: 'https://bscscan.com/tx/%s',
    address: 'https://bscscan.com/address/%s',
    token: 'https://bscscan.com/token/%s'
  }
}

export const getLinks = (networkId = FALLBACK_CHAIN_ID) => {
  if (networkId === 97) {
    return {
      tokenOnPancakeExchange:
        'https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=%s'
    }
  }

  return {
    tokenOnPancakeExchange:
      'https://exchange.pancakeswap.finance/#/swap?outputCurrency=%s'
  }
}
