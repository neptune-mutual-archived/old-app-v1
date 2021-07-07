import Head from 'next/head'

import { ListPools } from '../components/Farm'
import FarmFilter from '../components/Farm/Filter'
import FarmHero from '../components/Farm/Hero'
import Disclaimer from '../components/shared/Footer/Disclaimer'
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
      <PoolProvider>
        <FarmFilterProvider>
          <FarmHero />
          <LPDisclaimer />
          <div className='mx-auto px-4 py-8 max-w-7xl'>
            <div className='flex justify-between'>
              <div>&nbsp;</div>
              <div className='flex gap-4 py-4'>
                <FarmFilter />
              </div>
            </div>

            <div className='grid py-12 gap-5 xl:gap-8 2xl:gap-12 grid-cols-1 lg:grid-cols-2'>
              <ListPools />
            </div>

            <Disclaimer>
              The Neptune Mutual platform incentivizes the liquidity providers
              with NEP tokens. The NEP tokens provided here fall under{' '}
              <strong>“Liquidity Pool Rewards”</strong> in our{' '}
              <a
                href={TOKEN_DESIGN_URL}
                target='_blank'
                rel='noopener noreferrer'
              >
                <strong className='text-blue-400'>token design</strong>
              </a>
              . The available tokens in the liquidity pool rewards have a finite
              supply. The rewards will keep decreasing and farming will
              eventually be stopped.
            </Disclaimer>
          </div>
        </FarmFilterProvider>
      </PoolProvider>
    </>
  )
}
