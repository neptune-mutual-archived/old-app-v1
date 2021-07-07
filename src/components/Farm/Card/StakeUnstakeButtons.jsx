import { useWeb3React } from '@web3-react/core'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/react/solid'
import { hasValue } from '../../../utils/bignumbers'
import { IconButton } from '../../Buttons/Icon'

const StakeUnstakeButtons = ({ openModal, modalTypes, data }) => {
  const { active } = useWeb3React()

  if (!active || !hasValue(data.allowance)) {
    return null
  }

  if (!hasValue(data.staked)) {
    return (
      <button
        className='px-6 py-1 rounded-md bg-blue-500 text-white'
        onClick={() => openModal(modalTypes.STAKE)}
      >
        Farm
      </button>
    )
  }

  return (
    <div className='flex gap-2 mt-2 justify-between'>
      <IconButton label='Stake' onClick={() => openModal(modalTypes.STAKE)}>
        <PlusSmIcon className='h-5 w-5' aria-hidden='true' />
      </IconButton>
      <IconButton label='Unstake' onClick={() => openModal(modalTypes.UNSTAKE)}>
        <MinusSmIcon className='h-5 w-5' aria-hidden='true' />
      </IconButton>
    </div>
  )
}

export default StakeUnstakeButtons
