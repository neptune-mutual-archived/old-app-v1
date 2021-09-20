import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { PlusSmIcon } from '@heroicons/react/solid'
import { hasValue } from '../../../utils/bignumbers'
import { IconButton } from '../../Buttons/Icon'

export const ReleaseOrBond = ({ onRelease, onBond, info }) => {
  const { active } = useWeb3React()

  if (!active || !hasValue(info.allowance)) {
    return null
  }

  if (!hasValue(info.bonded)) {
    return <span />
  }

  return (
    <div className='flex gap-2'>
      <button
        className='px-6 py-1 rounded-md bg-blue-500 text-white'
        onClick={onRelease}
      >
        Release
      </button>

      <IconButton label='Bond More' onClick={onBond} small>
        <PlusSmIcon className='h-5 w-5' aria-hidden='true' />
      </IconButton>
    </div>
  )
}
