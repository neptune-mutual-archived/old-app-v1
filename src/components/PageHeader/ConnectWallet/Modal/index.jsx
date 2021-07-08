import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { Trans } from '@lingui/macro'

import Modal, { ModalTitle } from '../../../shared/Modal'
import { networks } from '../../../../config/networks'
import { wallets } from '../../../../config/wallets'
import SelectNetwork from './SelectNetwork'
import SelectWallet from './SelectWallet'
import useAuth from '../../../../hooks/useAuth'
import { classNames } from '../../../../utils/class-names'

const Content = ({ closeModal }) => {
  const { active } = useWeb3React()
  const { login, logout } = useAuth()

  const [networkId, setNetworkId] = useState()
  const [walletId, setWalletId] = useState()

  const onConnect = () => {
    if (!networkId || !walletId) {
      return
    }

    if (active) {
      logout()
    }

    const wallet = wallets.find((x) => x.id === walletId)
    const connectorName = wallet.connectorName

    login(connectorName, networkId)
    closeModal()
  }

  return (
    <div>
      <SelectNetwork
        networks={networks}
        selected={networkId}
        setSelected={setNetworkId}
      />
      <SelectWallet
        networkId={networkId}
        wallets={wallets}
        selected={walletId}
        setSelected={setWalletId}
      />

      <button
        onClick={onConnect}
        className={classNames(
          'inline-flex justify-center items-center mt-6 mb-2 py-1 px-4 border-2 border-transparent shadow-sm text-base font-medium rounded focus:outline-none',
          networkId && walletId
            ? 'text-white bg-blue-500 hover:bg-blue-600'
            : 'text-gray-800 bg-gray-500 cursor-not-allowed'
        )}
      >
        Connect
      </button>
    </div>
  )
}

const ConnectModal = ({ open, closeModal }) => {
  return (
    <Modal open={open} closeModal={closeModal}>
      {({ cancelButtonRef }) => (
        <>
          <Dialog.Title as='div'>
            <ModalTitle
              closeModal={closeModal}
              cancelButtonRef={cancelButtonRef}
            >
              <h3 className='text-2xl text-gray-300 font-medium'>
                <Trans>Connect Wallet</Trans>
              </h3>
            </ModalTitle>
          </Dialog.Title>
          <Content closeModal={closeModal} />
        </>
      )}
    </Modal>
  )
}

export default ConnectModal
