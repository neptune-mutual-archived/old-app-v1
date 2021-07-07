import React from 'react'
import { Dialog } from '@headlessui/react'
import Modal from '../../../shared/Modal'
import { BondContent } from './BondForm'
import { ReleaseContent } from './ReleaseForm'
import { CardModalTitle } from './Title'

export const CardModal = ({ open, type, openModal, closeModal, data }) => {
  let title = <div>Unexpected Error </div>
  let Content = () => <div />

  if (type === 'BOND') {
    title = <>Bond {data.symbol}</>
    Content = BondContent
  } else if (type === 'RELEASE') {
    title = <>Release {data.lpTokenSymbol} Bond LP</>
    Content = ReleaseContent
  }

  const contentProps = {
    closeModal,
    tokenContract: data.token,
    logo: data.logo,
    liquidity: data.liquidity,
    lpTokenSymbol: data.lpTokenSymbol,
    bonded: data.bonded,
    nepAmount: data.nepAmount,
    releaseDate: data.releaseDate,
    symbol: data.symbol,
    bondContract: data.bond,
    name: data.name,
    lockingPeriod: data.lockingPeriod,

    endDate: data.endDate,
    isEnded: data.isEnded
  }

  return (
    <Modal open={open} closeModal={closeModal}>
      {({ cancelButtonRef, isPending, setIsPending }) => (
        <>
          <Dialog.Title as='h3'>
            <CardModalTitle
              logo={data.logo}
              name={data.name}
              closeModal={closeModal}
              isPending={isPending}
            >
              {title}
            </CardModalTitle>
          </Dialog.Title>
          <Content
            cancelButtonRef={cancelButtonRef}
            setIsPending={setIsPending}
            {...contentProps}
          />
        </>
      )}
    </Modal>
  )
}
