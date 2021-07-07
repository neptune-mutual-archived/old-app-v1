// Set of helper functions to facilitate wallet setup
import chains, { FALLBACK_CHAIN_ID } from '../config/constants/chains'
import { wallets } from '../config/wallets'

const getParams = (chainId) => {
  const { networkId, ...params } = chains.find((x) => x.networkId === chainId)

  return params
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (selectedChainId) => {
  const chainId = selectedChainId || FALLBACK_CHAIN_ID

  const provider = window.ethereum

  // try {
  //   // Try BinanceChainWallet
  //   const binanceProvider = window.BinanceChain

  //   await binanceProvider.switchNetwork(String(selectedChainId))
  // } catch (error) {
  //   console.error("Can't setup the BSC network on binance wallet")
  //   return false
  // }

  if (!provider) {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    )
    return false
  }

  try {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [getParams(chainId)]
    })

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage
) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage
      }
    }
  })

  return tokenAdded
}

export const getConnector = (walletId, networkId) => {
  const getter = wallets.find((x) => x.id === walletId).connector
  return getter(networkId)
}
