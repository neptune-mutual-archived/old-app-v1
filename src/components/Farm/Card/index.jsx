import { useCallback, useState } from 'react'
import DetailsPane from './DetailsPane'
import styles from './index.module.css'
import PrimaryPane from './PrimaryPane'
import { FlipCard, FlipCardBack, FlipCardFront } from '../../shared/FlipCard'
import { ComingSoonCardFront } from '../../shared/ComingSoonCardFront'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
import { percentFormatter } from '../../../utils/formatter'
import { Ribbon } from '../../shared/CardRibbon'
import allFeatures from '../../../config/pool/features'
import Harvest from './Harvest'
import Modal from './Modal'
import { useWeb3React } from '@web3-react/core'
import { ApproveToSpend } from './ApproveToSpend'
import StakeUnstakeButtons from './StakeUnstakeButtons'
import { CardDetails } from '../../shared/CardDetails'
import { getPoolDetails } from '../../../utils/data/pool'

const modalTypes = {
  STAKE: 'STAKE',
  UNSTAKE: 'UNSTAKE'
}

const FarmCard = ({ data }) => {
  const { active } = useWeb3React()
  const [showBack, setShowBack] = useState(false)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(modalTypes.STAKE)

  const details = getPoolDetails(data)
  const isComingSoon = !hasValue(data.maxToStake) || !data.isLive
  const canHarvest = active && hasValue(data.rewards)
  const isPancakeLinked = data.features.some(
    (feature) => feature.invariant === allFeatures.PANCAKESWAP.invariant
  )

  const closeModal = () => {
    setOpen(false)
  }

  const openModal = (modalType) => {
    setType(modalType)
    setOpen(true)
  }

  // eslint-disable-next-line no-unused-vars
  const flipCard = useCallback(() => setShowBack((x) => !x), [])

  const flipCardProps = {
    showBack,
    cardClass: styles.card,
    cardBodyClass: data.hot ? styles['card_body--hot'] : null
  }

  const modalProps = { open, type, closeModal, openModal, data }

  return (
    <>
      <FlipCard {...flipCardProps}>
        <FlipCardFront className={styles.card_front}>
          {isComingSoon && (
            <ComingSoonCardFront name={data.name} logo={data.logo} />
          )}
          {!isComingSoon && (
            <>
              <PrimaryPane data={data}>
                <ApproveToSpend data={data} />
                <StakeUnstakeButtons
                  data={data}
                  openModal={openModal}
                  modalTypes={modalTypes}
                />
              </PrimaryPane>
              <DetailsPane
                bottomBgSrc={data.background}
                isPancakeLinked={isPancakeLinked}
              >
                <CardDetails details={details} />
                {canHarvest && <Harvest data={data} />}
              </DetailsPane>
              <Ribbon priority={data.priority}>
                {percentFormatter(convertFromUnits(data.apy), 0)} APY
              </Ribbon>
            </>
          )}
        </FlipCardFront>

        <FlipCardBack className={styles.card_back}>
          {/* <button onClick={flipCard}>Click here to flip</button> */}
        </FlipCardBack>
      </FlipCard>

      <Modal {...modalProps} />
    </>
  )
}

export default FarmCard
