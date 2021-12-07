import Head from 'next/head'

import { Banner } from '../components/Home/Banner'
import { MyLiquidityRewards } from '../components/Home/MyLiquidityRewards'
import { NepTokenDetails } from '../components/Home/NepTokenDetails'
import { RateOfRewards } from '../components/Home/RateOfRewards'
import { TokenDistribution } from '../components/Home/TokenDistribution'
import { TopFarms } from '../components/Home/TopFarms'
import { TotalRewards } from '../components/Home/TotalRewards'
import { TotalSupplyAndRewards } from '../components/Home/TotalSupplyAndRewards'
import { TotalValueLocked } from '../components/Home/TotalValueLocked'
import ComingSoon from '../components/shared/Hero/ComingSoon'

export default function Home() {
  return (
   <>
         <Head>
        <title>Home - Neptune Mutual</title>
      </Head>
      <ComingSoon />
    </>
  )
}
