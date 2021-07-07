import { VARIANTS } from '../../shared/ToastMessage'
import { useTransactionStorage } from '../../../hooks/useTransactionStorage'
import { useWeb3React } from '@web3-react/core'
import { getTransactionStatus } from '../../../utils/transaction'
import { getExplorer } from '../../../config/stats'
import { formatRelative, fromUnixTime } from '../../../utils/date'

export const TxMessage = ({ tx }) => {
  const { library, chainId, account } = useWeb3React()
  const { updateTx } = useTransactionStorage()

  const explorer = getExplorer(chainId)

  const Var = VARIANTS[tx.type] || VARIANTS.Info

  if (tx && tx.type && tx.type === 'Pending' && tx.hash) {
    getTransactionStatus({ library, hash: tx.hash }).then((status) => {
      if (status !== null) {
        const type = status === 1 ? 'Success' : 'Error'
        updateTx(chainId, account, tx.hash, type)
      }
    })
  }

  const txLink = explorer.tx.replace('%s', tx.hash || '')

  const explorerLink = (
    <a
      target='_blank'
      rel='noopener noreferrer'
      className='hover:text-blue-400 inline-flex'
      href={txLink}
    >
      {tx.message}
    </a>
  )

  return (
    <>
      <div className='flex items-start'>
        <div className='flex-shrink-0'>{Var.icon}</div>
        <div className='ml-3 w-0 flex-1'>
          <div className='uppercase text-gray-400 text-xs'>
            {formatRelative(fromUnixTime(tx.time))}
          </div>
          <div className='mt-1 text-sm font-medium text-gray-300'>
            {tx.hash ? explorerLink : tx.message}
          </div>
        </div>
      </div>
    </>
  )
}
