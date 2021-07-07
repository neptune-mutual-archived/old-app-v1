import { Trans } from '@lingui/macro'
import styles from './index.module.css'

const ConnectWalletButton = ({ openModal }) => {
  return (
    <div className='flex gap-4 flex-wrap justify-end'>
      <button className={styles.disconnected} onClick={openModal}>
        <Trans>Connect Wallet</Trans>
      </button>
    </div>
  )
}

export default ConnectWalletButton
