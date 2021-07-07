import { classNames } from '../../../../utils/class-names'
import CheckIcon from '../../../shared/icons/CheckIcon'

const Option = ({ onClick, name, icon, isActive, isDisabled }) => {
  return (
    <button
      key={name}
      className={classNames(
        'flex flex-col items-center gap-2 py-4 px-4 rounded-lg hover:bg-gray-900 text-center',
        isActive ? 'bg-black' : null
      )}
      onClick={onClick}
    >
      <div className='relative w-12 h-12 rounded-full bg-blue-900 bg-opacity-50'>
        {icon}
        {isActive && (
          <span className='absolute -right-1 -bottom-1 text-green-600 bg-white rounded-full'>
            <CheckIcon className='w-5 h-5' />
          </span>
        )}
      </div>
      <div className={classNames(isDisabled && 'text-gray-500')}>{name}</div>
    </button>
  )
}

export default Option
