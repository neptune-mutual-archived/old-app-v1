import { useStatsContext } from '../../hooks/useStatsContext'
import { convertFromUnits } from '../../utils/bignumbers'
import { CounterAnimation } from '../shared/CounterAnimation'

export const TotalSupplyAndRewards = () => {
  const { totalNepSupply, totalRewardAllocation } = useStatsContext()
  return (
    <div className='px-7 pb-6 bg-gray-400 bg-opacity-5 rounded-2xl flex-grow'>
      <div className='flex flex-wrap justify-start'>
        <div className='mr-auto'>
          <h5 className='pt-6 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
            Total Supply
          </h5>
          <p
            className='font-numbers text-xl sm:text-2xl md:text-3xl xl:text-4xl font-medium whitespace-nowrap'
            style={{ minWidth: '16ch' }}
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
          <h5 className='pt-6 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
            Reward Allocation
          </h5>
          <p
            className='font-numbers text-xl sm:text-2xl md:text-3xl xl:text-4xl font-medium whitespace-nowrap'
            style={{ minWidth: '16ch' }}
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
    </div>
  )
}
