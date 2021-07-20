// Set of helper functions to facilitate wallet setup
import { ConnectorNames } from '../config/connectors'
import chains from '../config/constants/chains'

const getParams = (chainId) => {
  const { networkId, ...params } = chains.find((x) => x.networkId === chainId)

  return params
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (selectedChainId, connectorName) => {
  if (!selectedChainId) {
    return false
  }

  switch (connectorName) {
    case ConnectorNames.BSC:
      try {
        const binanceProvider = window.BinanceChain
        await binanceProvider.switchNetwork(selectedChainId.toString())
        return true
      } catch (error) {
        console.error(error)
        return false
      }

    case ConnectorNames.Injected:
    default: {
      const provider = window.ethereum

      if (!provider) {
        console.error("Can't setup network - window.ethereum is undefined")
        return false
      }

      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [getParams(selectedChainId)]
        })

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }
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
