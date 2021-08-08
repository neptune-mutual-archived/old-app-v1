import { useState } from 'react'
import { OutlineButton } from '../../../Buttons/Outline'
import { RegularButton } from '../../../Buttons/Regular'
import CompareArrows from '../../../shared/icons/CompareArrows'
import { useTransactionToast } from '../../../../hooks/useTransactionToast'
import { useBond } from '../../../../hooks/contracts/useBond'
import { formatWeiToNumber } from '../../../../utils/formatter'

const TokenWithImage = ({ imgAlt, imgSrc, tokenSymbol, tokenAmount }) => (
  <div className='flex flex-col gap-4 items-center'>
    <div className='bg-gray-800 rounded-full w-20 h-20 flex justify-center items-center'>
      <img src={imgSrc} alt={imgAlt} className='w-12 h-12' />
    </div>
    <div>
      <span className='text-gray-200 whitespace-nowrap'>{tokenAmount}</span>{' '}
      {tokenSymbol}
    </div>
  </div>
)

export const ReleaseContent = ({
  closeModal,
  setIsPending,
  name,
  logo,
  bonded,
  symbol,
  liquidity,
  nepAmount,
  isEnded,
  tokenContract,
  bondContract,
  lpTokenSymbol
}) => {
  const [confirming, setConfirming] = useState(false)
  const { transactionPlaced, transactionError } = useTransactionToast()

  const bond = useBond({ contract: bondContract })

  const formattedBonded = formatWeiToNumber(bonded)
  const formattedNEPAmount = formatWeiToNumber(nepAmount)
  const NEPSymbol = 'NEP'

  const onConfirm = async () => {
    try {
      setIsPending(true)
      const tx = await bond.releaseBond({
        token: tokenContract
      })

      setConfirming(true)
      await transactionPlaced(tx, {
        title: 'Bond: ' + name,
        feature: 'Bond Release',
        textPending: `Releasing ${formattedBonded} ${symbol} and ${formattedNEPAmount} ${NEPSymbol} from the Bond Pool`,
        textSuccess: `Released ${formattedBonded} ${symbol} and ${formattedNEPAmount} ${NEPSymbol} from the Bond Pool`
      })
    } catch (error) {
      transactionError(error)
    } finally {
      setConfirming(false)
      setIsPending(false)
    }

    closeModal()
  }

  return (
    <>
      <div className='my-4 px-2'>
        <div className='block mt-4 my-2 uppercase font-bold text-sm text-gray-400'>
          your bond
        </div>
        <div className='text-gray-200'>
          {formatWeiToNumber(liquidity)} {lpTokenSymbol}
        </div>
        <div className='py-3 px-6 my-8 bg-gray-700 bg-opacity-75 rounded-lg'>
          <div className='text-gray-400'>
            <p className='text-center text-sm'>On Pancakeswap</p>
            <div className='flex gap-8 justify-center mt-6'>
              <TokenWithImage
                imgAlt={symbol}
                imgSrc={logo}
                tokenAmount={formattedBonded}
                tokenSymbol={symbol}
              />
              <div className='flex pt-6'>
                <CompareArrows />
              </div>
              <TokenWithImage
                imgAlt='NEP Token'
                imgSrc='/nep-icon.svg'
                tokenAmount={formattedNEPAmount}
                tokenSymbol='NEP'
              />
            </div>
          </div>
        </div>
        <p className='text-gray-400 bg-gradient-to-r from-gray-900 px-4 py-2 rounded-lg border-l-4 border-yellow-600 border-opacity-75'>
          The released liquidity pool token will be transferred to your wallet.
          You can either withdraw your LP tokens directly on PancakeSwap or use
          the LP tokens on the{' '}
          <strong className='font-semibold'>NEP farms</strong> to get additional
          ROI.
        </p>
      </div>

      <div className='mt-6 flex justify-end gap-4'>
        {!confirming && (
          <OutlineButton onClick={closeModal}>Cancel</OutlineButton>
        )}
        <RegularButton
          type='submit'
          onClick={onConfirm}
          isProcessing={confirming}
          isDisabled={!isEnded}
        >
          {confirming ? 'Pending...' : 'Confirm'}
        </RegularButton>
      </div>
    </>
  )
}
