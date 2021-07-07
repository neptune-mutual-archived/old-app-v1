import Tippy from '@tippyjs/react'
import { useWeb3React } from '@web3-react/core'
import { hasValue } from '../../../utils/bignumbers'
import { classNames } from '../../../utils/class-names'
import { useTransactionToast } from '../../../hooks/useTransactionToast'
import { useERC20 } from '../../../hooks/contracts/useERC20'

export const ApproveToSpend = ({ info }) => {
  const { transactionPlaced, transactionError } = useTransactionToast()
  const { active } = useWeb3React()
  const erc20 = useERC20({ contract: info.token })

  const enabled = active && info.isLive
  const msg = active ? 'Coming soon' : 'Please connect your wallet'

  if (hasValue(info.allowance)) {
    return null
  }

  const onApprove = async () => {
    if (!enabled) {
      return
    }

    try {
      const tx = await erc20.approve({
        spender: info.bond
      })

      await transactionPlaced(tx, {
        title: info.name,
        feature: 'Bond Approve',
        textPending: `Approving to spend ${info.symbol}`,
        textSuccess: `Approved to spend ${info.symbol}`
      })
    } catch (error) {
      transactionError(error)
    }
  }

  return (
    <Tippy
      content={<span>{msg}</span>}
      interactive
      disabled={enabled}
      animation='perspective'
    >
      <span tabIndex='0'>
        <button
          className={classNames(
            'px-6 py-1 rounded-md',
            enabled
              ? 'bg-blue-500 text-white'
              : 'bg-gray-500 text-gray-800 cursor-not-allowed'
          )}
          onClick={onApprove}
          disabled={!enabled}
        >
          Approve
        </button>
      </span>
    </Tippy>
  )
}
