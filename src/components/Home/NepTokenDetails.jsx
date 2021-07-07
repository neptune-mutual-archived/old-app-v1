import { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import { useWeb3React } from '@web3-react/core'
import {
  ExternalLinkIcon,
  CheckIcon,
  DuplicateIcon,
  PlusCircleIcon
} from '@heroicons/react/outline'
import { registerToken } from '../../utils/wallet'
import { getLinks, getNEPToken } from '../../config/stats'
import { useStatsContext } from '../../hooks/useStatsContext'
import { amountFormatter } from '../../utils/formatter'
import { convertFromUnits } from '../../utils/bignumbers'
import { truncateAddress } from '../../utils/address'

export const NepTokenDetails = () => {
  const { chainId } = useWeb3React()
  const { nepPrice } = useStatsContext()
  const [copied, setCopied] = useState(false)

  const nepToken = getNEPToken(chainId)
  const links = getLinks(chainId)

  const copyAddress = () => {
    try {
      navigator.clipboard.writeText(nepToken.address)
    } catch (error) {
      console.log('Cannot copy')
    }
    setCopied(true)
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }, [copied])

  return (
    <div
      className='bg-pink-700 rounded-2xl flex flex-wrap flex-col gap-6 p-6'
      style={{
        backgroundImage: 'url("/patterns/nep-home-card-bg.svg")',
        backgroundSize: '120%'
      }}
    >
      <div className='flex gap-4 flex-wrap'>
        <a
          href={links.tokenOnPancakeExchange.replace('%s', nepToken.address)}
          className='block font-numbers max-w-xs w-8/12 flex-grow'
          target='_blank'
          rel='noreferrer'
        >
          NEP now available on the PancakeSwap Exchange
        </a>
        <div
          className='py-8 px-4 rounded-lg text-pink-700 bg-pink-300 bg-opacity-90 text-center flex-grow'
          style={{ minWidth: '5rem' }}
        >
          <div className='font-numbers text-lg leading-none whitespace-nowrap'>
            ${' '}
            {amountFormatter(
              convertFromUnits(nepPrice || '0')
                .decimalPlaces(2)
                .toNumber()
            )}
          </div>
          <div style={{ fontSize: '0.625rem' }}>NEP/BUSD</div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4'>
        <Tippy
          content={nepToken.address}
          animation='perspective'
          maxWidth='400'
        >
          <span tabIndex='0' className='flex items-center'>
            <button className='truncate w-full'>
              {truncateAddress(nepToken.address)}
            </button>
          </span>
        </Tippy>
        <button
          className='inline-flex focus:outline-none'
          onClick={copyAddress}
        >
          <span className='sr-only'>
            {copied ? 'Copied' : 'Copy'} to clipboard
          </span>
          {!copied && <DuplicateIcon className='h-5 w-5' aria-hidden='true' />}
          {copied && (
            <CheckIcon className='h-5 w-5 text-green-400' aria-hidden='true' />
          )}
        </button>
        <a
          href={nepToken.explorer}
          target='_blank'
          rel='noreferrer'
          className='inline-flex focus:outline-none'
        >
          <span className='sr-only'>View in explorer</span>
          <ExternalLinkIcon className='h-5 w-5' aria-hidden='true' />
        </a>
        <button
          className='inline-flex focus:outline-none'
          onClick={() => {
            registerToken(
              nepToken.address,
              'NEP',
              18,
              'https://neptunemutual.com/nep-icon.svg'
            )
          }}
        >
          <span className='sr-only'>Add to wallet</span>
          <PlusCircleIcon className='h-5 w-5' aria-hidden='true' />
        </button>
      </div>
    </div>
  )
}
