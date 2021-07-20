import HeroWrapper from '../../shared/Hero/Wrapper'
import HeroTitle from '../../shared/Hero/Title'
import HeroSubtitle from '../../shared/Hero/Subtitle'
import HeroContent from '../../shared/Hero/Content'
import Ribbon from './Ribbon'
import {
  RISK_FACTORS,
  HOW_DOES_FARM_WORK
} from '../../../config/constants/external-links'
import { usePoolContext } from '../../../hooks/usePoolContext'
import { percentFormatter } from '../../../utils/formatter'
import { Trans } from '@lingui/macro'

const FarmHero = () => {
  const { getMaxAPYFraction } = usePoolContext()
  const maxAPY = percentFormatter(getMaxAPYFraction(), 0)

  return (
    <HeroWrapper>
      <HeroTitle>
        <Trans>NEP Farming Pools</Trans>
      </HeroTitle>
      <HeroSubtitle>RECEIVE UP TO {maxAPY} APY IN NEP TOKENS</HeroSubtitle>
      <HeroContent>
        You can farm NEP tokens by providing cryptocurrencies and LP tokens from
        PancakeSwap. Get up to {maxAPY} APY during initial token farming period.
      </HeroContent>

      <div className='flex flex-wrap px-5 xl:pl-10'>
        <a
          href={HOW_DOES_FARM_WORK}
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium underline text-sm md:text-lg leading-tight inline-block mr-3'
        >
          How Does This Work?
        </a>
        <a
          href={RISK_FACTORS}
          target='_blank'
          rel='noopener noreferrer'
          className='font-medium underline text-sm md:text-lg leading-tight inline-block ml-3'
        >
          Risk factors
        </a>
      </div>
      <Ribbon />
    </HeroWrapper>
  )
}

export default FarmHero
