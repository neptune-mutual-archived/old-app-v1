import BigNumber from 'bignumber.js'

import { convertFromUnits, hasValue } from '../bignumbers'
import { getPriorityAPY } from '../priority'
import { mergeAlternatively } from '../arrays'
import { amountFormatter, percentFormatter } from '../formatter'
import { fromUnixTime, isPast } from '../date'

export const getBondData = (info, summary, allowance) => {
  const apy = (info && info.apy) || '0'

  const releaseDate = (summary && summary.releaseDate) || '0'
  const endDate = fromUnixTime(Number(releaseDate.toString()))
  const isEnded = isPast(endDate)

  return {
    id: (info && info.id) || '-',
    hot: (info && info.hot) || false,
    apy,
    priority: getPriorityAPY(BigNumber(apy).multipliedBy(100).toString()),
    logo: (info && info.assets && info.assets.logo) || '',
    background: (info && info.assets && info.assets.background) || '/',
    symbol: (info && info.symbol) || '*',
    target: (info && info.target) || '0',
    entryFee: (info && info.fees && info.fees.entry) || '0',
    otherFee: (info && info.fees && info.fees.other) || '0',
    exitFee: (info && info.fees && info.fees.exit) || '0',
    lock: (info && info.lock) || '-',
    roi: (info && info.roi) || '0',
    token: (info && info.token) || {},
    bond: (info && info.bond) || {},
    isLive: (info && info.live) || false,
    name: (info && info.name) || '',
    lockingPeriod: (info && info.lockingPeriod) || 0,
    lpTokenSymbol: (info && info.lpTokenSymbol) || '',

    liquidity: (summary && summary.liquidity) || '0',
    nepAmount: (summary && summary.nepAmount) || '0',
    bonded: (summary && summary.bondTokenAmount) || '0',
    totalLocked: (summary && summary.totalLocked) || '0',

    releaseDate,
    endDate,
    isEnded,

    allowance
  }
}

export const getBondDetails = (data) => {
  const leftHalf = [
    {
      title: 'target',
      value: `${amountFormatter(convertFromUnits(data.target).toNumber())} ${
        data.symbol
      }`
    },
    {
      title: 'roi',
      value: percentFormatter(data.roi, 2)
    },
    {
      title: 'LP Reward',
      value: 'Variable',
      tooltip:
        'Along with the 100% bond reward in NEP tokens, you will also receive liquidity provider fees in the PancakeSwap exchange. We can not exactly estimate and display the actual LP reward here.'
    }
  ]

  const rightHalf = [
    {
      title: 'entry FEE',
      value: percentFormatter(data.entryFee, 2)
    },
    {
      title: 'Other Fees',
      value: percentFormatter(data.otherFee, 2)
    },
    {
      title: 'EXIT FEE',
      value: percentFormatter(data.exitFee, 2)
    },
    {
      title: 'lock',
      value: data.lock
    }
  ]

  if (hasValue(data.bonded)) {
    leftHalf.push({
      title: 'your stake',
      value: `${amountFormatter(convertFromUnits(data.bonded))} ${data.symbol}`
    })
  }

  return mergeAlternatively(leftHalf, rightHalf, {
    title: '',
    value: ''
  })
}
