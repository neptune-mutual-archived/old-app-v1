import Head from 'next/head'

import { ListBonds } from '../components/Bond'
import BondFilter from '../components/Bond/Filter'
import BondHero from '../components/Bond/Hero'
import Disclaimer from '../components/shared/Footer/Disclaimer'
import LPDisclaimer from '../components/shared/LPDisclaimer'
import { TOKEN_DESIGN_URL } from '../config/constants/external-links'
import { BondFilterProvider } from '../context/bond-filter'

export default function Bond() {
  return (
    <>
      <Head>
        <title>Bond - Neptune Mutual</title>
      </Head>
      <BondFilterProvider>
        <BondHero />
        <LPDisclaimer />
        <div className='mx-auto px-4 py-8 max-w-7xl'>
          <div className='flex justify-between'>
            <div>&nbsp;</div>
            <div className='flex gap-4 py-4'>
              <BondFilter />
            </div>
          </div>

          <div className='grid py-12 gap-5 xl:gap-8 2xl:gap-12 grid-cols-1 lg:grid-cols-2'>
            <ListBonds />
          </div>

          <Disclaimer>
            The Neptune Mutual platform incentivizes the bond stakers with NEP
            tokens. The NEP tokens provided here fall under{' '}
            <strong>“Liquidity Pool Rewards”</strong> in our{' '}
            <a
              href={TOKEN_DESIGN_URL}
              target='_blank'
              rel='noopener noreferrer'
            >
              <strong className='text-blue-400'>token design</strong>
            </a>
            . The available tokens in the liquidity pool rewards have a finite
            supply. The rewards will keep decreasing and farming will eventually
            be stopped.
          </Disclaimer>
        </div>
      </BondFilterProvider>
    </>
  )
}
