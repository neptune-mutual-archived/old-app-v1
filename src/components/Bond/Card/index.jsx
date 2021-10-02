import React, { useCallback, useState } from 'react'
import { CardModal } from './Modal'
import DetailsPane from './DetailsPane'
import styles from './index.module.css'
import PrimaryPane from './PrimaryPane'
import { FlipCard, FlipCardBack, FlipCardFront } from '../../shared/FlipCard'
import { ComingSoonCardFront } from '../../shared/ComingSoonCardFront'
import { percentFormatter } from '../../../utils/formatter'
import { Ribbon } from '../../shared/CardRibbon'
import { ReleaseOrBond } from './ReleaseOrBond'

const modalTypes = {
  BOND: 'BOND',
  RELEASE: 'RELEASE'
}

const BondCard = ({ data }) => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(modalTypes.BOND)
  const [showBack, setShowBack] = React.useState(false)

  const flipCard = useCallback(() => setShowBack((x) => !x), [])
  const closeModal = setOpen.bind(setOpen, false)

  const openModal = (type) => {
    setType(type)
    setOpen(true)
  }

  const modalProps = { open, type, closeModal, openModal, data }

  const flipCardProps = {
    showBack,
    cardClass: styles.card,
    cardBodyClass: data.hot ? styles['card_body--hot'] : null
  }

  return (
    <>
      <FlipCard {...flipCardProps}>
        <FlipCardFront className={styles.card_front}>
          {data.isLive && (
            <>
              <PrimaryPane
                openModal={openModal}
                modalTypes={modalTypes}
                info={data}
              >
                <ReleaseOrBond
                  info={data}
                  onBond={() => openModal(modalTypes.BOND)}
                  onRelease={() => openModal(modalTypes.RELEASE)}
                />
              </PrimaryPane>
              <DetailsPane flipCard={flipCard} data={data} />
              <Ribbon priority={data.priority}>
                {percentFormatter(data.apy, 0)} APY
              </Ribbon>
            </>
          )}
          {!data.isLive && (
            <ComingSoonCardFront name={data.name} logo={data.logo} />
          )}
        </FlipCardFront>

        <FlipCardBack className={styles.card_back}>
          {/* <button onClick={flipCard}>Click here to flip</button> */}
        </FlipCardBack>
      </FlipCard>

      <CardModal {...modalProps} />
    </>
  )
}

export default BondCard
