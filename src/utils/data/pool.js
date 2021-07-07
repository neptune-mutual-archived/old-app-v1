import { convertFromUnits, hasValue } from '../bignumbers'
import { getPriorityAPY } from '../priority'
import { mergeAlternatively } from '../arrays'
import { amountFormatter, percentFormatter } from '../formatter'

export const getPoolData = (info, summary, allowance, tvl) => {
  return {
    tvl,
    allowance,

    hot: info && info.hot,
    farm: (info && info.farm) || {},
    isLive: (info && info.live) || false,
    isLPToken: (info && info.isLPToken) || false,
    liquidity: (info && info.symbol && info.symbol.liquidity) || '',
    features: (info && info.features) || [],
    lockingPeriod: (info && info.lockingPeriod) || '',
    logo: (info && info.assets && info.assets.logo) || '/',
    background: (info && info.assets && info.assets.background) || '/',
    entryFee: (info && info.fees && info.fees.entry) || 0,
    exitFee: (info && info.fees && info.fees.exit) || 0,
    rewardSymbol: (info && info.symbol && info.symbol.reward) || '',
    token: (info && info.token) || {},
    type: (info && info.type) || '',
    name: (info && info.name) || '',
    tokenSwapLink: (info && info.tokenSwapLink) || '#',

    apy: (summary && summary.apy) || '0',
    rewards: (summary && summary.rewards) || '0',
    maxToStake: (summary && summary.maxToStake) || '0',
    staked: (summary && summary.staked) || '0',
    totalTokensLocked: (summary && summary.totalTokensLocked) || '0',

    priority:
      info && typeof info.defaultPriority === 'number'
        ? info.defaultPriority
        : getPriorityAPY(
            convertFromUnits((summary && summary.apy) || '0')
              .multipliedBy(100)
              .toNumber()
          )
  }
}

export const getPoolDetails = (data) => {
  const tvlFormatted = `$ ${amountFormatter(
    convertFromUnits(data.tvl).toNumber()
  )}`
  const apyFormatted = percentFormatter(convertFromUnits(data.apy).toNumber())

  const leftHalf = [
    {
      title: 'TOTAL VALUE LOCKED',
      value: tvlFormatted
    },
    { title: 'APY', value: apyFormatted }
  ]
  const rightHalf = [
    {
      title: 'Entry Fee',
      value: percentFormatter(data.entryFee, 2)
    },
    { title: 'Other Fees', value: percentFormatter(0, 2) },
    {
      title: 'EXIT FEE',
      value: percentFormatter(data.exitFee, 2)
    }
  ]

  if (data.isLPToken) {
    leftHalf.push({
      title: 'LP Reward',
      value: 'Variable',
      tooltip:
        hasValue(data.apy) &&
        `On top of ${apyFormatted} APY here, you will also receive transaction fees in ${data.liquidity} pool in the PancakeSwap Exchange.`
    })
  }

  if (data.lockingPeriod) {
    leftHalf.push({ title: 'locking Period', value: data.lockingPeriod })
  }

  const details = mergeAlternatively(leftHalf, rightHalf, {
    title: '',
    value: ''
  })

  return details
}
