import React from 'react'
import { convertFromUnits, getRelativePercent } from '../../utils/bignumbers'

const ProgressBar = ({ min, max, now }) => {
  const filled = getRelativePercent(min, max, now)

  return (
    <div
      className='w-full bg-blue-800 bg-opacity-50 transition-all duration-500 rounded-full overflow-hidden'
      title={`~${filled}%`}
    >
      <div
        className='bg-indigo-400 transition-all duration-500 h-1.5 rounded-full overflow-hidden'
        style={{ width: `${filled}%`, minWidth: '2%' }}
        role='progressbar'
        aria-valuenow={convertFromUnits(now).toNumber()}
        aria-valuemin={convertFromUnits(min).toNumber()}
        aria-valuemax={convertFromUnits(max).toNumber()}
      />
    </div>
  )
}

export default ProgressBar
