import Head from 'next/head'

import { ListPools } from '../components/Farm'
import FarmFilter from '../components/Farm/Filter'
import FarmHero from '../components/Farm/Hero'
import Disclaimer from '../components/shared/Footer/Disclaimer'
import ComingSoon from '../components/shared/Hero/ComingSoon'
import LPDisclaimer from '../components/shared/LPDisclaimer'
import { TOKEN_DESIGN_URL } from '../config/constants/external-links'
import { FarmFilterProvider } from '../context/farm-filter'
import { PoolProvider } from '../context/pool'

export default function Pool() {
  return (
    <>
      <Head>
        <title>Pool - Neptune Mutual</title>
      </Head>
      
      <ComingSoon />
    </>
  )
}
