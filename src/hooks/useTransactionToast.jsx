import { useWeb3React } from '@web3-react/core'

import { getExplorer } from '../config/stats'
import { useToast } from '../context/toast'
import { unixTimeAfter } from '../utils/date'
import { getErrorMessage } from '../utils/errors'
import { useTransactionStorage } from './useTransactionStorage'

const INFO_TIMEOUT = 25000 // 25 seconds
const SUCCESS_TIMEOUT = 100000 // 100 seconds
const ERROR_TIMEOUT = 10000 // 10 seconds

export const useTransactionToast = () => {
  const { chainId, account } = useWeb3React()
  const { store, updateTx, updateToError } = useTransactionStorage()
  const toast = useToast()

  const explorer = getExplorer(chainId)

  const transactionPlaced = async (
    tx,
    { title, textPending, textSuccess, feature } = {}
  ) => {
    if (!toast) {
      return
    }

    const txLink = explorer.tx.replace('%s', tx.hash)

    const explorerLink = (
      <a
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-400 hover:underline inline-flex items-center gap-2 mt-6'
        href={txLink}
      >
        <span>View Transaction</span>
      </a>
    )

    try {
      if (feature) {
        store(chainId, account, {
          type: 'Pending',
          time: unixTimeAfter(),
          message: `${feature}: ${textSuccess}`,
          hash: tx.hash
        })
      }

      const id = toast.pushInfo({
        title,
        message: (
          <>
            <p>{textPending || 'Transaction Posted'}</p>
            {explorerLink}
          </>
        ),
        lifetime: INFO_TIMEOUT
      })

      const receipt = await tx.wait(1)

      const type = receipt.status === 1 ? 'Success' : 'Error'
      updateTx(chainId, account, tx.hash, type)

      await toast.remove(id)

      if (type === 'Success') {
        toast.pushSuccess({
          title,
          message: (
            <>
              <p>{textSuccess || 'Transaction Successful'}</p>
              {explorerLink}
            </>
          ),
          lifetime: SUCCESS_TIMEOUT
        })
      } else {
        toast.pushError({
          title,
          message: (
            <>
              <p>{textPending || 'Transaction Failed'}</p>
              {explorerLink}
            </>
          ),
          lifetime: ERROR_TIMEOUT
        })
      }
    } catch (error) {
      updateToError(chainId, account, tx.hash)
      toast.pushError({
        title,
        message: getErrorMessage(error),
        lifetime: ERROR_TIMEOUT
      })
      console.error(error)
    }
  }

  const transactionError = (error) => {
    console.error(error)

    toast &&
      toast.pushError({
        message: getErrorMessage(error),
        lifetime: ERROR_TIMEOUT
      })
  }
  return {
    transactionPlaced,
    transactionError
  }
}
