import React from 'react'
import { classNames } from '../../../utils/class-names'

export const Row = ({ name, amount = 0, percent = 0, color, tooltip }) => {
  return (
    <tr>
      <td className='pr-4 py-3 whitespace-nowrap'>
        <div className='flex items-center'>
          <div>
            <div className={classNames('w-2 h-2 rounded-full', color)} />
          </div>
          <div className='ml-4'>
            <div className='text-gray-300'>{name}</div>
          </div>
        </div>
      </td>
      <td className='px-4 py-3 whitespace-nowrap' title={tooltip}>
        <div className=' text-gray-300'>{amount} NEP</div>
      </td>
      <td className='px-4 py-3 whitespace-nowrap'>
        <div className='text-gray-300'>{percent}%</div>
      </td>
    </tr>
  )
}
