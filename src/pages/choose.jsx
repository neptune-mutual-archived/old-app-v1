import Head from 'next/head'
import Link from 'next/link'

import useBondsContext from '../hooks/useBondsContext'
import { usePoolContext } from '../hooks/usePoolContext'
import { percentFormatter } from '../utils/formatter'

const Content = () => {
  const { getMaxAPYFraction: getMaxPoolAPYFraction } = usePoolContext()
  const { getMaxAPYFraction: getMaxBondAPYFraction } = useBondsContext()

  return (
    <div className='text-center max-w-screen-sm mx-auto my-16'>
      <p className='text-lg text-gray-400'>
        Hurry up. Only limited NEP tokens available.
      </p>
      <h3 className='text-4xl font-medium'>Initial Farm Offering</h3>
      <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-48 my-8 md:my-14'>
        <Link href='/bond'>
          <a className='max-w-xs flex flex-col items-center gap-4 transition-all hover:bg-gray-500 hover:bg-opacity-5 border border-transparent hover:border-gray-700 rounded-md px-4 py-6'>
            <img
              src='/bond-abstract.png'
              alt='bond'
              className='w-40 h-40'
              style={{
                filter: 'drop-shadow(4px 4px 39px rgba(94, 186, 38, 0.13))'
              }}
            />
            <h4 className='font-numbers text-2xl font-medium'>Bond</h4>
            <div className='bg-pink-700 px-3 py-1 rounded-full text-xs font-medium tracking-wider'>
              {`${percentFormatter(getMaxBondAPYFraction(), 2)} APY`}
            </div>
            <p className='text-lg text-gray-400'>
              Stake a liquidity token to create a pair with the NEP token
            </p>
          </a>
        </Link>
        <Link href='/pool'>
          <a className='max-w-xs flex flex-col items-center gap-4 transition-all hover:bg-gray-500 hover:bg-opacity-5 border border-transparent hover:border-gray-700 rounded-md px-4 py-6'>
            <img
              src='/pool-abstract.png'
              alt='pool'
              className='w-40 h-40'
              style={{
                filter: 'drop-shadow(4px 4px 39px rgba(94, 186, 38, 0.13))'
              }}
            />
            <h4 className='font-numbers text-2xl'>Pool</h4>
            <div className='bg-pink-700 px-3 py-1 rounded-full text-xs font-medium tracking-wider'>
              {`${percentFormatter(getMaxPoolAPYFraction(), 2)} % APY`}
            </div>
            <p className='text-lg text-gray-400'>
              Stake popular cryptocurrencies to get NEP token reward
            </p>
          </a>
        </Link>
      </div>

      <Link href='/'>
        <a className='text-blue-500 hover:underline'>&larr; Back to Home</a>
      </Link>
    </div>
  )
}

const Choose = () => {
  return (
    <>
      <Head>
        <title>Participate - Neptune Mutual</title>
      </Head>
      <Content />
    </>
  )
}

export default Choose
