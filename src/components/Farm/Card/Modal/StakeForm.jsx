import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import WalletIcon from '../../../shared/icons/WalletIcon'
import { LegendToggle } from '../../../shared/icons/LegendToggle'
import NumberInputWithMax from '../../../shared/Forms/NumberInputWithMax'
import { OutlineButton } from '../../../Buttons/Outline'
import { RegularButton } from '../../../Buttons/Regular'
import { useTransactionToast } from '../../../../hooks/useTransactionToast'
import { useERC20 } from '../../../../hooks/contracts/useERC20'
import BigNumber from 'bignumber.js'
import {
  convertFromUnits,
  convertToUnits,
  differenceOf,
  isGreater
} from '../../../../utils/bignumbers'
import { useFarmOrPool } from '../../../../hooks/contracts/useFarmOrPool'
import { formatWeiToNumber } from '../../../../utils/formatter'

export const StakeContent = ({
  closeModal,
  cancelButtonRef,
  setIsPending,
  token,
  type,
  name,
  liquidity,
  totalTokensLocked,
  maxToStake
}) => {
  const { transactionPlaced, transactionError } = useTransactionToast()
  const { account } = useWeb3React()
  const farmOrPoolInstance = useFarmOrPool()

  const erc20 = useERC20({ contract: token })

  const [amount, setAmount] = useState()
  const [confirming, setConfirming] = useState(false)
  const [balance, setBalance] = useState('0')

  useEffect(() => {
    const updateTokenBalance = async () => {
      const result = await erc20.balanceOf(account)
      setBalance(result)
    }

    updateTokenBalance()
  }, [])

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
      const tx = await farmOrPoolInstance.deposit({
        type,
        token,
        amount
      })

      setConfirming(true)
      await transactionPlaced(tx, {
        title: name,
        feature: 'Pool Deposit',
        textPending: `Adding ${amount} ${liquidity}`,
        textSuccess: `Added ${amount} ${liquidity}`
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
    title: 'Amount You Wish To DEPOSIT',
    value: amount,
    onChange: (e) => setAmount(e.target.value),
    typeOfAmount: liquidity,
    onMax: onMax,
    error: isGreater(convertToUnits(amount || '0'), balance)
      ? 'Amount exceeds balance'
      : null
  }
  return (
    <>
      <NumberInputWithMax {...numberInputProps} />
      <div className='flex gap-1 items-center mt-2'>
        <div className='text-gray-400'>
          <WalletIcon />
        </div>
        <div className='text-gray-400'>
          Balance:{' '}
          <span className='text-gray-200'>
            {convertFromUnits(balance)
              .decimalPlaces(2, BigNumber.ROUND_DOWN)
              .toNumber()}
          </span>{' '}
          {liquidity}
        </div>
      </div>
      <div className='flex gap-1 items-center mt-2'>
        <div className='text-gray-400'>
          <LegendToggle />
        </div>
        <div className='text-gray-400'>
          Remaining in pool:{' '}
          <span className='text-gray-200'>
            {formatWeiToNumber(differenceOf(maxToStake, totalTokensLocked))}
          </span>{' '}
          {liquidity}
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

export const StakeFooter = ({ symbol, link }) => {
  return (
    <div className='flex justify-center font-medium mt-8'>
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 hover:text-blue-600'
      >
        Get {symbol} from PancakeSwap
      </a>
    </div>
  )
}
