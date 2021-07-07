import { uuidv4 } from '../utils/random'
import { getTransactionStatus } from '../utils/transaction'
import { useLocalStorage } from './useLocalStorage'

export const useTransactionStorage = () => {
  const [, setState, getLiveData] = useLocalStorage('transactions_store', {})

  const store = (chainId, account, tx) => {
    try {
      const key = `${chainId}:${account}`
      const storedId = uuidv4()

      setState((prev) => {
        const existing = prev[key]
        return {
          ...prev,
          [key]: (existing || []).concat({
            id: storedId,
            ...tx
          })
        }
      })

      return storedId
    } catch (error) {
      console.error(error)
    }
  }

  const updateTx = (chainId, account, txHash, type) => {
    try {
      const key = `${chainId}:${account}`

      setState((prev) => {
        const existing = prev[key]

        const updated = (existing || []).map((x) => {
          if (x.hash === txHash) {
            return {
              ...x,
              type
            }
          }
          return x
        })

        return {
          ...prev,
          [key]: updated || []
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const updateToError = (chainId, account, txHash) =>
    updateTx(chainId, account, txHash, 'Error')
  const updateToSuccess = (chainId, account, txHash) =>
    updateTx(chainId, account, txHash, 'Success')

  const getStored = (chainId, account) => {
    try {
      const liveState = getLiveData()

      return liveState[`${chainId}:${account}`] || []
    } catch (error) {
      console.error(error)
    }
    return []
  }

  const checkAndUpdatePendingTxs = (chainId, account, library) => {
    const txs = getStored(chainId, account)
    const pendingTxs = txs.filter(
      (tx) => tx && tx.type && tx.type === 'Pending' && tx.hash
    )

    pendingTxs.forEach((tx) => {
      getTransactionStatus({ library, hash: tx.hash }).then((status) => {
        if (status !== null) {
          const type = status === 1 ? 'Success' : 'Error'
          updateTx(chainId, account, tx.hash, type)
        }
      })
    })
  }

  return {
    store,
    getStored,
    updateToSuccess,
    updateToError,
    updateTx,
    checkAndUpdatePendingTxs
  }
}
