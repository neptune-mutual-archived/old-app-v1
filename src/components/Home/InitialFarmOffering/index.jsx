import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/outline'
import useBondsContext from '../../../hooks/useBondsContext'
import { usePoolContext } from '../../../hooks/usePoolContext'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
import { amountFormatter } from '../../../utils/formatter'

export const InitialFarmOffering = () => {
  const { summaries: farmSummaries, getInfoById: getFarmById } =
    usePoolContext()
  const { summaries: bondSummaries, getInfoById: getBondById } =
    useBondsContext()

  const stakedFarms = []

  for (const id in farmSummaries) {
    const el = farmSummaries[id]
    const staked = el && el.staked
    if (el && hasValue(staked)) {
      stakedFarms.push({
        id: 'farm_' + id,
        info: getFarmById(id),
        staked: staked
      })
    }
  }

  const stakedBonds = []

  for (const id in bondSummaries) {
    const el = bondSummaries[id]
    const staked = el && el.bondTokenAmount
    if (el && hasValue(staked)) {
      stakedBonds.push({
        id: 'bond_' + id,
        info: getBondById(id),
        staked: staked
      })
    }
  }

  return (
    <div className='py-12'>
      <h3 className='text-2xl text-pink-400 opacity-90 font-medium'>
        Initial Farm Offering
      </h3>
      {stakedFarms.length === 0 && stakedBonds.length === 0 && (
        <>
          <p className='my-6 font-numbers max-w-xs'>
            Howdie, don&#39;t miss the chance to mine the initial NEP tokens
          </p>
          <Link href='/choose'>
            <a className='bg-pink-700 px-6 py-2 rounded-md'>Participate Now</a>
          </Link>
        </>
      )}
      <div className='flex flex-col gap-2 my-6'>
        {stakedFarms.map((x) => {
          const logo = (x.info && x.info.assets && x.info.assets.logo) || '/'
          const liquidityToken =
            (x.info && x.info.symbol && x.info.symbol.liquidity) || ''
          return (
            <Link href='/pool' key={x.id}>
              <a className='flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-600 hover:bg-opacity-30 rounded-xl'>
                <img src={logo} alt={x.info.name} className='w-12 h-12' />
                <div className='flex-grow'>
                  <p className='uppercase font-semibold text-xs text-gray-400 tracking-wider'>
                    pool
                  </p>
                  <h3 className='text-lg'>
                    {amountFormatter(convertFromUnits(x.staked).toNumber())}{' '}
                    {liquidityToken}
                  </h3>
                </div>
                <ChevronRightIcon className='w-6' />
              </a>
            </Link>
          )
        })}
        {stakedBonds.map((x) => {
          const logo = (x.info && x.info.assets && x.info.assets.logo) || '/'
          const symbol = (x.info && x.info.symbol) || ''

          return (
            <Link href='/bond' key={x.id}>
              <a className='flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-600 hover:bg-opacity-30 rounded-xl'>
                <img src={logo} alt={x.info.name} className='w-12 h-12' />
                <div className='flex-grow'>
                  <p className='uppercase font-semibold text-xs text-gray-400 tracking-wider'>
                    bond
                  </p>
                  <h3 className='text-lg'>
                    {amountFormatter(convertFromUnits(x.staked).toNumber())}{' '}
                    {symbol}
                  </h3>
                </div>
                <ChevronRightIcon className='w-6' />
              </a>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
