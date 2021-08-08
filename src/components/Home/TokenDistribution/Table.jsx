import React from 'react'
import { Row } from './Row'

export const SupplyTable = ({ distros }) => {
  return (
    <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
      <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
        <div className='overflow-hidden'>
          <table className='min-w-full text-xs xl:text-sm'>
            <thead>
              <tr className='sr-only'>
                <th
                  scope='col'
                  className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
                >
                  Name
                </th>
                <th
                  scope='col'
                  className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
                >
                  Amount
                </th>
                <th
                  scope='col'
                  className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {distros.map((distro, idx) => (
                <Row
                  key={idx}
                  name={distro.name}
                  amount={distro.amount}
                  percent={distro.percent}
                  color={distro.color}
                  tooltip={distro.tooltip}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
