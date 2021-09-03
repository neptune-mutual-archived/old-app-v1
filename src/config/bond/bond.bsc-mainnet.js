import { convertToUnits } from '../../utils/bignumbers'
import abis from '../abis'
import { addresses } from '../constants/addresses.bsc-mainnet'

const LOCKING_PERIOD = 90 * 24 * 60 * 60 // Seconds - 90 days

const getId = (str) => '56_' + str

const bonds = [
  {
    id: getId('1'),
    name: 'BUSD',
    target: convertToUnits(0),
    fees: {
      entry: 0.025,
      other: 0,
      exit: 0
    },
    lock: '90 days',
    lockingPeriod: LOCKING_PERIOD,
    roi: 1,
    apy: 4,
    hot: true,
    live: true,
    assets: {
      logo: '/pools/nep-busd.png',
      background: '/patterns/pyramid.svg'
    },
    token: {
      decimals: 18,
      address: addresses.tokens.BUSD,
      abi: abis.ierc20
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    },
    bond: {
      address: addresses.contracts.v1.BOND,
      abi: abis.bond
    },
    symbol: 'BUSD',
    lpTokenSymbol: 'BUSD-NEP'
  },
  {
    id: getId('2'),
    name: 'WBNB',
    target: convertToUnits(0),
    fees: {
      entry: 0.025,
      other: 0,
      exit: 0
    },
    lock: '90 days',
    lockingPeriod: LOCKING_PERIOD,
    roi: 1,
    apy: 4,
    hot: false,
    live: false,
    assets: {
      logo: '/pools/wbnb.png',
      background: '/patterns/scatter_polygons.svg'
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
    bond: {
      address: addresses.contracts.v1.BOND,
      abi: abis.bond
    },
    symbol: 'WBNB',
    lpTokenSymbol: 'WBNB-NEP'
  },
  {
    id: getId('3'),
    name: 'USDT',
    target: convertToUnits(0),
    fees: {
      entry: 0.025,
      other: 0,
      exit: 0
    },
    lock: '90 days',
    lockingPeriod: LOCKING_PERIOD,
    roi: 1,
    apy: 4,
    hot: false,
    live: false,
    assets: {
      logo: '/pools/nep-usdt.png',
      background: '/patterns/bubbles.svg'
    },
    token: {
      address: addresses.tokens.USDT,
      abi: abis.ierc20
    },
    discovery: {
      address: addresses.contracts.v1.DISCOVERY,
      abi: abis.discovery
    },
    bond: {
      decimals: 18,
      address: addresses.contracts.v1.BOND,
      abi: abis.bond
    },
    symbol: 'USDT',
    lpTokenSymbol: 'USDT-NEP'
  }
]

export default bonds
