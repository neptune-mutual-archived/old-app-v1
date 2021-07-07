// priority - high to low
// 0 priority is the highest

import { classNames } from '../../utils/class-names'

// 9 priority is the lowest
export const Ribbon = ({ children, priority = 0 }) => {
  return (
    <div
      className={classNames(
        'absolute top-6 left-0 px-6 py-1 font-bold text-xs tracking-wider',
        priority === 0 && 'bg-red-700',
        priority === 1 && 'bg-gray-700',
        priority === 2 && 'bg-gray-900'
      )}
    >
      {children}
    </div>
  )
}
