import { useStatsContext } from '../../hooks/useStatsContext'
import { convertFromUnits } from '../../utils/bignumbers'
import { CounterAnimation } from '../shared/CounterAnimation'
import { Card } from './Card'

export const TotalSupplyAndRewards = () => {
  const { totalNepSupply, totalRewardAllocation } = useStatsContext()
  return (
    <Card>
      <div className='flex flex-wrap justify-start'>
        <div className='mr-auto'>
          <h5 className='mt-1 mb-2 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
            Total Supply
          </h5>
          <p
            className='font-numbers text-xl sm:text-2xl md:text-3xl xl:text-4xl font-medium whitespace-nowrap'
            style={{ minWidth: '20ch' }}
          >
            <CounterAnimation
              value={convertFromUnits(totalNepSupply || 0)
                .decimalPlaces(6)
                .toNumber()}
            />
            {' NEP'}
          </p>
        </div>
        <div>
          <h5 className='mt-1 mb-2 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
            Reward Allocation
          </h5>
          <p
            className='font-numbers text-xl sm:text-2xl md:text-3xl xl:text-4xl font-medium whitespace-nowrap'
            style={{ minWidth: '20ch' }}
          >
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
