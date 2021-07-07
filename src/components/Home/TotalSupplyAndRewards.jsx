import { useStatsContext } from '../../hooks/useStatsContext'
import { convertFromUnits } from '../../utils/bignumbers'
import { CounterAnimation } from '../shared/CounterAnimation'
import { Card } from './Card'

export const TotalSupplyAndRewards = () => {
  const { totalNepSupply, totalRewardAllocation } = useStatsContext()
  return (
    <Card>
      <div className='flex flex-wrap justify-start gap-4 md:gap-0'>
        <div className='md:w-7/12'>
          <h5 className='mb-2 text-gray-400 font-bold text-sm tracking-wider uppercase'>
            Total Supply
          </h5>
          <p className='font-numbers text-2xl md:text-4xl font-medium whitespace-nowrap'>
            <CounterAnimation
              value={convertFromUnits(totalNepSupply || 0)
                .decimalPlaces(6)
                .toNumber()}
            />
            {' NEP'}
          </p>
        </div>
        <div className='md:w-5/12'>
          <h5 className='mb-2 text-gray-400 font-bold text-sm tracking-wider uppercase'>
            Reward Allocation
          </h5>
          <p className='font-numbers text-2xl md:text-4xl font-medium whitespace-nowrap'>
            <CounterAnimation
              value={convertFromUnits(totalRewardAllocation || 0)
                .decimalPlaces(6)
                .toNumber()}
            />
            {' NEP'}
          </p>
        </div>
      </div>
    </Card>
  )
}
