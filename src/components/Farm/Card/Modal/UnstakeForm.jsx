import { useState } from 'react'
import RewardIcon from '../../../shared/icons/RewardIcon'
import { CalendarViewDay } from '../../../shared/icons/CalendarViewDay'
import NumberInputWithMax from '../../../shared/Forms/NumberInputWithMax'
import { OutlineButton } from '../../../Buttons/Outline'
import { RegularButton } from '../../../Buttons/Regular'
import { useTransactionToast } from '../../../../hooks/useTransactionToast'
import {
  convertFromUnits,
  convertToUnits,
  isGreater
} from '../../../../utils/bignumbers'
import BigNumber from 'bignumber.js'
import { amountFormatter } from '../../../../utils/formatter'
import { useFarmOrPool } from '../../../../hooks/contracts/useFarmOrPool'

export const UnstakeContent = ({
  closeModal,
  setIsPending,
  token,
  type,
  name,
  liquidity,
  rewards,
  rewardSymbol,
  staked
}) => {
  const { transactionPlaced, transactionError } = useTransactionToast()
  const [amount, setAmount] = useState()
  const [confirming, setConfirming] = useState(false)
  const farmOrPool = useFarmOrPool()

  const onMax = async () => {
    setAmount(
      convertFromUnits(staked).decimalPlaces(2, BigNumber.ROUND_DOWN).toNumber()
    )
  }

  const onConfirm = async () => {
    try {
      setIsPending(true)
      const tx = await farmOrPool.withdraw({
        type,
        token,
        amount
      })

      setConfirming(true)
      await transactionPlaced(tx, {
        title: name,
        feature: 'Pool Withdraw',
        textPending: `Removing ${amount} ${liquidity}`,
        textSuccess: `Removed ${amount} ${liquidity}`
      })
    } catch (error) {
      transactionError(error)
    } finally {
      setConfirming(false)
      setIsPending(false)
    }

    closeModal()
  }

  const numberInputProps = {
    title: 'Amount You Wish To WIThdraw',
    value: amount,
    onChange: (e) => setAmount(e.target.value),
    typeOfAmount: liquidity,
    onMax: onMax,
    error: isGreater(convertToUnits(amount || '0'), staked)
      ? 'Amount exceeds staked'
      : null
  }
  return (
    <>
      <NumberInputWithMax {...numberInputProps} />
      <div className='flex gap-1 items-center mt-2'>
        <div className='text-gray-400'>
          <CalendarViewDay />
        </div>
        <div className='text-gray-400'>
          Total Staked:{' '}
          <span className='text-gray-200'>
            {convertFromUnits(staked)
              .decimalPlaces(2, BigNumber.ROUND_DOWN)
              .toNumber()}
          </span>{' '}
          {liquidity}
        </div>
      </div>
      <div className='flex gap-1 items-center mt-2'>
        <div className='text-gray-400'>
          <RewardIcon />
        </div>
        <div className='text-gray-400'>
          Reward:{' '}
          <span className='text-gray-200'>
            {amountFormatter(convertFromUnits(rewards).toNumber())}
          </span>{' '}
          {rewardSymbol}
        </div>
      </div>
      <div className='mt-6 flex justify-end gap-4'>
        {!confirming && (
          <OutlineButton onClick={closeModal}>Cancel</OutlineButton>
        )}
        <RegularButton
          type='submit'
          onClick={onConfirm}
          isProcessing={confirming}
        >
          {confirming ? 'Pending...' : 'Confirm'}
        </RegularButton>
      </div>
    </>
  )
}

export const UnstakeFooter = ({ closeModal }) => {
  return <div className='mt-4' />
}
