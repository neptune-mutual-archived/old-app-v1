import { Dialog } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { CheckIcon, DuplicateIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

import Modal, { ModalTitle } from '../../shared/Modal'
import { useTransactionStorage } from '../../../hooks/useTransactionStorage'
import { getExplorer } from '../../../config/stats'
import { getNetwork } from '../../../config/networks'
import { skipLimit } from '../../../utils/arrays'
import { classNames } from '../../../utils/class-names'
import { TxMessage } from './TxMessage'
import { truncateAddress } from '../../../utils/address'

const Content = ({ closeModal }) => {
  const { active, chainId, account, library } = useWeb3React()
  const { getStored, checkAndUpdatePendingTxs } = useTransactionStorage()

  const LIMIT = 5

  const [skip, setSkip] = useState(0)

  if (!active) {
    return (
      <div className='p-8'>
        <p>Please connect your wallet...</p>
      </div>
    )
  }

  const txs = getStored(chainId, account).sort((a, b) => {
    try {
      if (a.time < b.time) return 1
      if (a.time > b.time) return -1
    } catch (error) {}

    return 0
  })

  checkAndUpdatePendingTxs(chainId, account, library)

  const toShow = skipLimit(txs, skip, LIMIT)

  const onPrev = () => setSkip((prev) => prev - LIMIT)
  const onNext = () => setSkip((prev) => prev + LIMIT)

  const showPrev = skip > 0
  const showNext = skip + LIMIT < txs.length

  return (
    <>
      <div className='p-8 flex flex-col gap-4'>
        {txs.length === 0 && <p>No transactions</p>}
        {toShow.map((x, idx) => {
          return <TxMessage key={x.id || idx} tx={x} />
        })}
      </div>
      <div className='p-8 pt-0 flex items-center justify-end'>
        <button
          disabled={!showPrev}
          onClick={onPrev}
          className={classNames(
            'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border transition-all',
            showPrev
              ? 'border-gray-500 text-gray-200 bg-gray-700 hover:bg-gray-600'
              : 'border-gray-700 text-gray-500 bg-gray-800 cursor-not-allowed'
          )}
        >
          <span className='sr-only'>Previous</span>
          <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
        </button>
        <button
          disabled={!showNext}
          onClick={onNext}
          className={classNames(
            'ml-3',
            'relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border transition-all',
            showNext
              ? 'border-gray-500 text-gray-200 bg-gray-700 hover:bg-gray-600'
              : 'border-gray-700 text-gray-500 bg-gray-800 cursor-not-allowed'
          )}
        >
          <span className='sr-only'>Next</span>
          <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </div>
    </>
  )
}

export const TransactionModal = ({ open, closeModal }) => {
  const { active, chainId, account } = useWeb3React()
  const [copied, setCopied] = useState(false)

  const explorer = getExplorer(chainId)
  const network = getNetwork(chainId)

  const copyAddress = () => {
    try {
      navigator.clipboard.writeText(account)
    } catch (error) {
      console.log('Cannot copy')
    }
    setCopied(true)
  }

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 3000)
  }, [copied])

  return (
    <Modal open={open} closeModal={closeModal} noPadding>
      {({ cancelButtonRef }) => (
        <>
          <Dialog.Title
            as='div'
            className='px-8 py-8 bg-gray-600 bg-opacity-25'
          >
            <ModalTitle
              closeModal={closeModal}
              cancelButtonRef={cancelButtonRef}
            >
              <h3 className='text-3xl text-gray-300'>Recent Transactions</h3>
            </ModalTitle>
            {active && (
              <div className='flex mt-4 text-gray-400'>
                <div className='truncate'>{truncateAddress(account)}</div>
                <button
                  className='flex focus:outline-none ml-1 mr-4'
                  onClick={copyAddress}
                >
                  <span className='sr-only'>
                    {copied ? 'Copied' : 'Copy'} to clipboard
                  </span>
                  {!copied && (
                    <DuplicateIcon className='h-5 w-5' aria-hidden='true' />
                  )}
                  {copied && (
                    <CheckIcon
                      className='h-5 w-5 text-green-400'
                      aria-hidden='true'
                    />
                  )}
                </button>
                <a
                  href={explorer.address.replace('%s', account)}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-400 hover:underline'
                >
                  View in Explorer
                </a>
                <div className='justify-self-end ml-auto text-gray-300 font-light'>
                  {network.shortName || network.name}
                </div>
              </div>
            )}
          </Dialog.Title>
          <Content closeModal={closeModal} />
        </>
      )}
    </Modal>
  )
}
