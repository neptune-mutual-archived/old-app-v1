import React from 'react'
import useBondsContext from '../../../hooks/useBondsContext'
import { usePoolContext } from '../../../hooks/usePoolContext'
import { useStatsContext } from '../../../hooks/useStatsContext'
import {
  amountsToPercentages,
  calcPercent,
  convertFromUnits,
  sort
} from '../../../utils/bignumbers'
import { amountFormatter, formatWeiToNumber } from '../../../utils/formatter'
import { Card } from '../Card'
import { Bar } from './Bar'
import { SupplyTable } from './Table'

export const TokenDistribution = () => {
  const { totalNepSupply, totalBurned } = useStatsContext()
  const { totalNEPLocked: poolNEPLocked } = usePoolContext()
  const { rewardAllocation: bondNEPLocked } = useBondsContext()

  const poolNEPLockedPercent = calcPercent(poolNEPLocked, totalNepSupply)
    .decimalPlaces(0)
    .toNumber()
  const bondNEPLockedPercent = calcPercent(bondNEPLocked, totalNepSupply)
    .decimalPlaces(0)
    .toNumber()
  const burnedNEPPercent = calcPercent(totalBurned, totalNepSupply)
    .decimalPlaces(0)
    .toNumber()

  const fills = amountsToPercentages(poolNEPLocked, bondNEPLocked, '0')
  const distros = [
    {
      name: 'Total Burned',
      color: 'bg-white',
      amount: formatWeiToNumber(totalBurned || 0),
      tooltip: amountFormatter(convertFromUnits(totalBurned || 0).toNumber()),
      percent: burnedNEPPercent
    },
    {
      name: 'Locked (Pool)',
      color: 'bg-green-400',
      amount: formatWeiToNumber(poolNEPLocked || 0),
      tooltip: amountFormatter(convertFromUnits(poolNEPLocked || 0).toNumber()),
      percent: poolNEPLockedPercent,
      fillPercent: fills[0]
    },
    {
      name: 'Locked (Bond)',
      color: 'bg-orange-400',
      amount: formatWeiToNumber(bondNEPLocked || 0),
      tooltip: amountFormatter(convertFromUnits(bondNEPLocked || 0).toNumber()),
      percent: bondNEPLockedPercent,
      fillPercent: fills[1]
    },
    {
      name: 'Locked (Protocol)',
      color: 'bg-blue-400',
      amount: '0.00',
      tooltip: amountFormatter(0),
      percent: 0,
      fillPercent: fills[2]
    }
  ]

  const sorted = sort(distros, (x) => x.amount, true)

  return (
    <Card>
      <h5 className='mb-2 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
        Token Distribution
      </h5>
      <Bar distros={sorted} />
      <SupplyTable distros={distros} />
    </Card>
  )
}
