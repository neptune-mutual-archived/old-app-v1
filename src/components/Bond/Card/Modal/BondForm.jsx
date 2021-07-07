import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import NumberInputWithMax from '../../../shared/Forms/NumberInputWithMax'
import { OutlineButton } from '../../../Buttons/Outline'
import { RegularButton } from '../../../Buttons/Regular'
import {
  fromUnixTime,
  formatToUTC,
  unixTimeAfter
} from '../../../../utils/date'
import { InfoTooltip } from '../../../shared/InfoTooltip'
import { useTransactionToast } from '../../../../hooks/useTransactionToast'
import { useERC20 } from '../../../../hooks/contracts/useERC20'
import {
  convertFromUnits,
  convertToUnits,
  isGreater
} from '../../../../utils/bignumbers'
import BigNumber from 'bignumber.js'
import { useBond } from '../../../../hooks/contracts/useBond'
import { amountFormatter } from '../../../../utils/formatter'

export const BondContent = ({
  closeModal,
  cancelButtonRef,
  setIsPending,
  tokenContract,
  symbol,
  bondContract,
  name,
  lockingPeriod
}) => {
  const { account } = useWeb3React()
  const { transactionPlaced, transactionError } = useTransactionToast()

  const erc20 = useERC20({ contract: tokenContract })
  const bond = useBond({ contract: bondContract })

  const [amount, setAmount] = useState()
  const [confirming, setConfirming] = useState(false)
  const [balance, setBalance] = useState('0')
  const [nepAmount, setNepAmount] = useState('0')

  const formattedNEPAmount = amountFormatter(
    convertFromUnits(nepAmount || '0')
      .decimalPlaces(6, BigNumber.ROUND_DOWN)
      .toNumber()
  )
  const NEPSymbol = 'NEP'

  useEffect(() => {
    const updateTokenBalance = async () => {
      const result = await erc20.balanceOf(account)
      setBalance(result)
    }

    updateTokenBalance()
  }, [])

  useEffect(() => {
    const updateApproxNep = async () => {
      const result = await bond.getNepRequired({
        amount,
        token: tokenContract
      })

      setNepAmount(result)
    }

    updateApproxNep()
  }, [amount])

  const onMax = async () => {
    setAmount(
      convertFromUnits(balance)
        .decimalPlaces(2, BigNumber.ROUND_DOWN)
        .toNumber()
    )
  }

  const onConfirm = async () => {
    try {
      setIsPending(true)
      const tx = await bond.createBond({
        token: tokenContract,
        tokenAmount: convertToUnits(amount || 0).decimalPlaces(0),
        nepAmount: new BigNumber(nepAmount).multipliedBy(1.001).decimalPlaces(0)
      })

      setConfirming(true)
      await transactionPlaced(tx, {
        title: name,
        feature: 'Create Bond',
        textPending: `Adding ${amount} ${symbol} and ${formattedNEPAmount} ${NEPSymbol} from the Bond Pool`,
        textSuccess: `Added ${amount} ${symbol} and ${formattedNEPAmount} ${NEPSymbol} from the Bond Pool`
      })
    } catch (error) {
      transactionError(error)
    } finally {
      setConfirming(false)
      setIsPending(false)
    }

    closeModal()
  }

  const lockedTill = fromUnixTime(unixTimeAfter(lockingPeriod))

  const numberInputProps = {
    title: 'Amount You Wish To stake',
    value: amount,
    onChange: (e) => setAmount(e.target.value),
    typeOfAmount: symbol,
    onMax: onMax,
    error: isGreater(convertToUnits(amount || '0'), balance)
      ? 'Amount exceeds balance'
      : null
  }
  return (
    <>
      <NumberInputWithMax {...numberInputProps} />
      <div className='flex justify-end gap-1 items-center mt-2'>
        <div className='text-gray-400'>
          Balance:{' '}
          <span className='text-gray-200'>
            {convertFromUnits(balance)
              .decimalPlaces(2, BigNumber.ROUND_DOWN)
              .toNumber()}
          </span>{' '}
          {symbol}
        </div>
      </div>
      <label className='flex items-center gap-2 mt-4 my-2' htmlFor='amount'>
        <span className='uppercase font-bold text-sm text-gray-400 tracking-wider'>
          Approximate bond
        </span>
        <InfoTooltip>
          <span>
            Approximately {formattedNEPAmount} {NEPSymbol} will be bonded
          </span>
        </InfoTooltip>
      </label>
      <div className='flex justify-between items-center gap-1 py-3 px-4 text-gray-500 bg-gray-700 rounded-lg'>
        <div>{formattedNEPAmount}</div>
        <div>{NEPSymbol}</div>
      </div>
      <div className='flex justify-end gap-2 items-center mt-2'>
        <div className='text-gray-400 font-medium tracking-wider uppercase text-sm'>
          {formatToUTC(lockedTill.toISOString(), true)} UTC
        </div>
        <InfoTooltip>
          <span>Your stake will be released on this given date</span>
        </InfoTooltip>
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
