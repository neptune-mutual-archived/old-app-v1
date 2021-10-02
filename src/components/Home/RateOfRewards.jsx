import BigNumber from 'bignumber.js'
import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import useBondsContext from '../../hooks/useBondsContext'
import { usePoolContext } from '../../hooks/usePoolContext'

const getOption = ({ maxPoolAPY, maxBondAPY }) => {
  return {
    series: [
      {
        min: 0,
        max: 500,
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, '#585858'],
              [0.7, '#2C4499'],
              [1, '#99392C']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 30,
          fontSize: 10
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: 'inherit',
          fontSize: 18
        },
        data: [
          {
            value: maxPoolAPY,
            name: 'POOL',
            title: {
              color: '#ccc',
              offsetCenter: ['-40%', '80%'],
              fontSize: 10
            },
            detail: {
              offsetCenter: ['-40%', '92%']
            }
          },
          {
            value: maxBondAPY,
            name: 'BOND',
            title: {
              color: '#ccc',
              offsetCenter: ['40%', '80%'],
              fontSize: 10
            },
            detail: {
              offsetCenter: ['40%', '92%']
            }
          }
        ]
      }
    ]
  }
}

export const RateOfRewards = ({ maxPoolAPY, maxBondAPY }) => {
  const { getMaxAPYFraction: getMaxPoolAPYFraction } = usePoolContext()
  const { getMaxAPYFraction: getMaxBondAPYFraction } = useBondsContext()

  const option = getOption({
    maxPoolAPY: new BigNumber(getMaxPoolAPYFraction().toString())
      .multipliedBy(100)
      .decimalPlaces(0)
      .toNumber(),
    maxBondAPY: new BigNumber(getMaxBondAPYFraction().toString())
      .multipliedBy(100)
      .decimalPlaces(0)
      .toNumber()
  })

  echarts.registerTheme('my_theme', {
    backgroundColor: '#f4cccc'
  })

  return (
    <div className='flex flex-col flex-grow max-w-full'>
      <div className='w-full'>
        <ReactEcharts option={option} className='mx-auto flex justify-center' />
      </div>
      <p className='text-center text-lg'>Rate of Rewards</p>
    </div>
  )
}
