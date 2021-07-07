import { convertFromUnits, sumOf } from '../../utils/bignumbers'
import { CounterAnimation } from '../shared/CounterAnimation'
import { Card } from './Card'
import { TextStats } from './TextStats'
import useBondsContext from '../../hooks/useBondsContext'
import { usePoolContext } from '../../hooks/usePoolContext'
import { useStatsContext } from '../../hooks/useStatsContext'

export const TotalRewards = () => {
  const poolData = usePoolContext()
  const { getTotalNepPaired: getBondRewards } = useBondsContext()
  const { nepPrice } = useStatsContext()

  const getPoolRewards = () => {
    return sumOf(
      ...Object.values(poolData.summaries)
        .filter(Boolean)
        .map((x) => x.totalNepRewards)
    )
  }

  const totalRewards = sumOf(getPoolRewards(), getBondRewards())
  const nepInBUSD = convertFromUnits(nepPrice || 0)

  const totalRewardsPrice = nepInBUSD.multipliedBy(totalRewards.toString())

  return (
    <Card>
      <TextStats
        title='TOTAL REWARDS'
        value={
          <>
            {'$ '}
            <CounterAnimation
              value={convertFromUnits(totalRewardsPrice || 0)
                .decimalPlaces(6)
                .toNumber()}
            />
          </>
        }
        footer={
          <>
            <CounterAnimation
              value={convertFromUnits(totalRewards || 0)
                .decimalPlaces(6)
                .toNumber()}
            />
            {' NEP rewarded so far'}
          </>
        }
      />
    </Card>
  )
}
