import features from './features'
import abis from '../abis'
import { addresses } from '../constants/addresses.bsc-testnet'

const getTokenSwapLink = (output, input) => {
  if (input) {
    return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}&inputCurrency=${input}`
  }

  return `https://test-exchange-pancake.pages.dev/#/swap?outputCurrency=${output}`
}

const getId = (str) => '97_' + str

export default [
  {
    id: getId('1'),
    name: 'Cake Farm',
    type: 'Farm',
    fees: {
      entry: 0,
      other: 0,
      exit: 0
    },
    token: {
      decimals: 18,
      address: addresses.tokens.CAKE,
      abi: abis.ierc20
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    },
    farm: {
      address: addresses.contracts.v1.FARM,
      abi: abis.farm
    },
    features: [features.NO_FEE, features.PANCAKESWAP],
    hot: true,
    defaultPriority: 0,
    live: true,
    isLPToken: false,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(addresses.tokens.CAKE),
    assets: {
      logo: '/pools/cake.png',
      background: '/patterns/pyramid.svg'
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'CAKE'
    }
  },
  {
    id: getId('2'),
    name: 'NEP Farm',
    type: 'Pool',
    fees: {
      entry: 0,
      other: 0,
      exit: 0
    },
    token: {
      decimals: 18,
      address: addresses.tokens.NEP,
      abi: abis.ierc20
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    },
    farm: {
      address: addresses.contracts.v1.POOL,
      abi: abis.pool
    },
    features: [features.NO_FEE, features.NEPTUNE_MUTUAL],
    hot: false,
    defaultPriority: 0,
    live: true,
    isLPToken: false,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(addresses.tokens.NEP),
    assets: {
      logo: '/nep-icon.svg',
      background: '/patterns/stars.svg'
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'NEP'
    }
  },
  {
    id: getId('3'),
    name: 'NEP-BUSD Farm',
    type: 'Pool',
    fees: {
      entry: 0,
      other: 0,
      exit: 0
    },
    token: {
      decimals: 18,
      address: addresses.lp.NEPBUSD,
      abi: abis.ierc20
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    },
    farm: {
      address: addresses.contracts.v1.POOL,
      abi: abis.pool
    },
    features: [features.NO_FEE, features.LP_REWARDS, features.PANCAKESWAP],
    hot: false,
    live: true,
    isLPToken: true,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(
      addresses.tokens.NEP,
      addresses.tokens.BUSD
    ),
    assets: {
      logo: '/pools/nep-busd.png',
      background: '/patterns/half_circle.svg'
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'NEP-BUSD LP'
    }
  },
  {
    id: getId('4'),
    name: 'WBNB Farm',
    type: 'Pool',
    fees: {
      entry: 0.025,
      other: 0,
      exit: 0
    },
    token: {
      decimals: 18,
      address: addresses.tokens.WBNB,
      abi: abis.ierc20
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    },
    farm: {
      address: addresses.contracts.v1.POOL,
      abi: abis.pool
    },
    features: [features.NEPTUNE_MUTUAL],
    hot: false,
    live: true,
    isLPToken: false,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(addresses.tokens.WBNB),
    assets: {
      logo: '/pools/wbnb.png',
      background: '/patterns/scatter_polygons.svg'
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'WBNB'
    }
  },
  {
    id: getId('5'),
    name: 'NEP-BNB Farm',
    type: 'Pool',
    fees: {
      entry: 0,
      other: 0,
      exit: 0
    },
    features: [features.NO_FEE, features.LP_REWARDS, features.PANCAKESWAP],
    hot: false,
    live: false,
    releaseHeight: 103939434, // Upcoming and block fixed
    isLPToken: true,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(
      addresses.tokens.NEP,
      addresses.tokens.WBNB
    ),
    assets: {
      logo: '/pools/nep-bnb.png',
      background: '/patterns/triangles.svg'
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'NEP-BNB LP'
    }
  },
  {
    id: getId('6'),
    name: 'NEP-USDT Farm',
    type: 'Pool',
    fees: {
      entry: 0,
      other: 0,
      exit: 0
    },
    features: [features.NO_FEE, features.LP_REWARDS, features.PANCAKESWAP],
    hot: false,
    live: false,
    releaseHeight: null, // This would mean upcoming but date/block not yet fixed
    isLPToken: true,
    lockingPeriod: '24 hours',
    tokenSwapLink: getTokenSwapLink(
      addresses.tokens.NEP,
      addresses.tokens.USDT
    ),
    assets: {
      logo: '/pools/nep-usdt.png',
      background: '/patterns/bubbles.svg'
    },
    symbol: {
      reward: 'NEP',
      liquidity: 'NEP-USDT LP'
    }
  }
]
