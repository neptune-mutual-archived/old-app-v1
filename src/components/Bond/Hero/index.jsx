import {
  HOW_DOES_BOND_WORK,
  RISK_FACTORS
} from '../../../config/constants/external-links'
import HeroContent from '../../shared/Hero/Content'
import HeroTitle from '../../shared/Hero/Title'
import HeroWrapper from '../../shared/Hero/Wrapper'
import Ribbon from './Ribbon'

const BondHero = () => {
  return (
    <HeroWrapper>
      <HeroTitle>NEP Bond Pool</HeroTitle>
      <HeroContent>
        Select a cryptocurrency to participate in the NEP bond pool which not
        only generates the following rewards but you will also get all of the
        liquidity pool fee earned in PancakeSwap exchange. Furthermore, you can
        also provide the LP tokens to earn additional rewards in the NEP farms
        once your LP tokens are released after the locking period.
      </HeroContent>

      <div className='flex flex-wrap gap-6'>
        <a
          href={HOW_DOES_BOND_WORK}
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium underline text-lg leading-tight'
        >
          How Does This Work?
        </a>
        <a
          href={RISK_FACTORS}
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium underline text-lg leading-tight'
        >
          Risk factors
        </a>
      </div>

      <Ribbon />
    </HeroWrapper>
  )
}

export default BondHero
