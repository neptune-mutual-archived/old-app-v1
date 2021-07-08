import React from 'react'
import Tippy from '@tippyjs/react'
import InfoIcon from './icons/InfoIcon'

export const InfoTooltip = ({ children }) => {
  return (
    <Tippy content={children} animation='perspective' interactive>
      <span tabIndex='0' className='flex items-center'>
        <button>
          <InfoIcon className='w-4 h-4 text-gray-300' />
        </button>
      </span>
    </Tippy>
  )
}
