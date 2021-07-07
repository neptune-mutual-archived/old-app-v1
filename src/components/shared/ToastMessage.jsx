import React, { useEffect } from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import { classNames } from '../../utils/class-names'

export const VARIANTS = {
  Info: {
    icon: (
      <InformationCircleIcon
        className='h-6 w-6 text-blue-400'
        aria-hidden='true'
      />
    ),
    name: 'Info'
  },
  Error: {
    icon: <XCircleIcon className='h-6 w-6 text-red-400' aria-hidden='true' />,
    name: 'Error'
  },
  Warning: {
    icon: (
      <ExclamationCircleIcon
        className='h-6 w-6 text-yellow-400'
        aria-hidden='true'
      />
    ),
    name: 'Warning'
  },
  Success: {
    icon: (
      <CheckCircleIcon className='h-6 w-6 text-green-400' aria-hidden='true' />
    ),
    name: 'Success'
  }
}

const ToastMessage = ({
  id,
  header,
  message,
  lifetime,
  onRemove,
  truncate = 'truncate-1-lines',
  icon,
  type,
  title
}) => {
  const Var = type
    ? VARIANTS[type]
    : {
        icon: icon,
        name: header
      }
  useEffect(() => {
    if (lifetime && onRemove) {
      setTimeout(() => {
        onRemove(id)
      }, lifetime)
    }
  }, [lifetime])

  return (
    <div
      className={classNames(
        'w-full bg-gray-800 text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden',
        type && 'max-h-40'
      )}
    >
      <div className='p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0'>{Var.icon}</div>
          <div className='ml-3 w-0 flex-1 pt-0.5'>
            <p className='text-sm font-medium text-gray-50'>
              {title || Var.name}
            </p>
            <div className='mt-1 text-sm text-gray-300'>{message}</div>
          </div>
          <div className='ml-4 flex-shrink-0 flex'>
            <button
              className='rounded-md inline-flex text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              onClick={() => {
                onRemove && onRemove(id)
              }}
            >
              <span className='sr-only'>Close</span>
              <XIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastMessage
