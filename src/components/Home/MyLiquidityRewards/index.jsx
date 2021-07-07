import { useWeb3React } from '@web3-react/core'
import useBondsContext from '../../../hooks/useBondsContext'
import { usePoolContext } from '../../../hooks/usePoolContext'
import {
  amountsToPercentages,
  convertFromUnits,
  sumOf
} from '../../../utils/bignumbers'

export const MyLiquidityRewards = () => {
  const { active } = useWeb3React()
  const poolData = usePoolContext()
  const bondsData = useBondsContext()

  if (!active) {
    return null
  }

  const getFarmRewards = () => {
    return sumOf(
      ...Object.values(poolData.summaries)
        .filter(Boolean)
        .map((x) => x.myNepRewards)
    )
  }

  const getBondRewards = () => {
    return sumOf(
      ...Object.values(bondsData.summaries)
        .filter(Boolean)
        .map((x) => x.myNepRewards)
    )
  }

  const percents = amountsToPercentages(getBondRewards(), getFarmRewards())
  const total = sumOf(getBondRewards(), getFarmRewards())

  const bars = [
    {
      name: 'Bond',
      title: convertFromUnits(getBondRewards()).decimalPlaces(2).toNumber(),
      color: 'bg-red-700',
      width: `${percents[0].toFixed(0)}%`
    },
    {
      name: 'Farm',
      title: convertFromUnits(getFarmRewards()).decimalPlaces(2).toNumber(),
      color: 'bg-blue-700',
      width: `${percents[1].toFixed(0)}%`
    },
    {
      name: 'Cover',
      title: 0.0,
      color: 'bg-green-700',
      width: '0%'
    },
    {
      name: 'Bridge',
      title: 0.0,
      color: 'bg-orange-700',
      width: '0%'
    }
  ]

  return (
    <div className='bg-yellow-200 px-12 py-8 rounded-xl text-gray-800 relative overflow-hidden'>
      <h3 className='text-sm text-gray-600 opacity-75'>My Liquidity Rewards</h3>
      <div className='font-numbers text-2xl font-medium mt-1 mb-3'>
        {convertFromUnits(total).decimalPlaces(2).toNumber()} NEP
      </div>
      <div className='text-sm mb-3'>Summary</div>
      <div className='flex flex-col gap-2 pr-8'>
        {bars.map((bar) => (
          <div key={bar.name} className='flex gap-2 text-xs'>
            <div className='opacity-75'>{bar.name[0]}</div>
            <div
              title={bar.name + ': ' + bar.title + ' NEP'}
              className={`relative ${bar.color} h-4 bg-opacity-60`}
              style={{ minWidth: '4px', width: bar.width }}
            >
              <span className='absolute -right-8 opacity-75'>{bar.width}</span>
            </div>
          </div>
        ))}
      </div>
      <img
        src='/patterns/liquidity-left.png'
        alt='pattern'
        className='absolute left-0 top-12 pointer-events-none transform scale-125'
      />
      <img
        src='/patterns/liquidity-right.png'
        alt='pattern'
        className='absolute right-0 top-1/2 pointer-events-none transform scale-125'
      />
    </div>
  )
}
