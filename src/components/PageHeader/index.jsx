import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import { useState } from 'react'
import ConnectWalletButton from './ConnectWallet/ConnectButton'
import AccountMenu from './ConnectWallet/AccountMenu'
import ConnectModal from './ConnectWallet/Modal'
import { TransactionModal } from './ViewTransactions'
import styles from './style.module.css'

const PageHeader = () => {
  const { active } = useWeb3React()
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [isTransactionOpen, setIsTransactionOpen] = useState(false)

  const closeConnectModal = () => setIsConnectOpen(false)
  const openConnectModal = () => setIsConnectOpen(true)
  const connectModalProps = {
    open: isConnectOpen,
    closeModal: closeConnectModal
  }

  const closeTransactionModal = () => setIsTransactionOpen(false)
  const openTransactionModal = () => setIsTransactionOpen(true)
  const transactionModalProps = {
    open: isTransactionOpen,
    closeModal: closeTransactionModal
  }

  return (
    <div className='w-full p-5 flex justify-between items-center'>
      <Link href='/'>
        <a>
          <picture className={styles.logo}>
            <source media='(min-width: 720px)' srcSet='/nep-logo.svg' />
            <source media='(min-width: 120px)' srcSet='/nep-icon.svg' />
            <img src='/nep-icon.svg' alt='Neptune Mutual' />
          </picture>
        </a>
      </Link>

      {active && (
        <AccountMenu
          openConnectModal={openConnectModal}
          openTransactionModal={openTransactionModal}
        />
      )}
      {!active && <ConnectWalletButton openModal={openConnectModal} />}

      <ConnectModal {...connectModalProps} />
      <TransactionModal {...transactionModalProps} />
    </div>
  )
}

export default PageHeader
