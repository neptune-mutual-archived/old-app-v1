import Head from 'next/head'

import { Banner } from '../components/Home/Banner'
import { InitialFarmOffering } from '../components/Home/InitialFarmOffering'
import { MyLiquidityRewards } from '../components/Home/MyLiquidityRewards'
import { NepTokenDetails } from '../components/Home/NepTokenDetails'
import { RateOfRewards } from '../components/Home/RateOfRewards'
import { TokenDistribution } from '../components/Home/TokenDistribution'
import { TopFarms } from '../components/Home/TopFarms'
import { TotalRewards } from '../components/Home/TotalRewards'
import { TotalSupplyAndRewards } from '../components/Home/TotalSupplyAndRewards'
import { TotalValueLocked } from '../components/Home/TotalValueLocked'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Neptune Mutual</title>
      </Head>
      <div className='max-w-screen-2xl px-4 py-6 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
          <div className='grid grid-cols-1 gap-4 md:gap-6 md:col-span-2'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <TotalRewards />
              <TotalValueLocked />
              <TokenDistribution />
              <RateOfRewards />
              <div className='md:col-span-2'>
                <TotalSupplyAndRewards />
              </div>
              <TopFarms />
              <Banner />
            </div>
          </div>
          <div className='self-stretch flex flex-col'>
            <div className='py-6 px-6 md:px-12 bg-gray-400 bg-opacity-5 rounded-2xl flex-grow'>
              <NepTokenDetails />
              <InitialFarmOffering />
              <MyLiquidityRewards />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
