import { classNames } from '../../../../utils/class-names'
import { CheckCircleIcon } from '@heroicons/react/solid'

const Option = ({ onClick, name, icon, isActive, isDisabled }) => {
  return (
    <button
      key={name}
      className={classNames(
        'flex flex-col items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-900 text-center',
        isActive ? 'bg-black' : null
      )}
      onClick={onClick}
    >
      <div className='relative w-12 h-12 rounded-full bg-blue-900 bg-opacity-50'>
        <img src={icon} width='48' height='48' />
        {isActive && (
          <span className='absolute -right-1 -bottom-1 bg-white text-green-500 rounded-full'>
            <CheckCircleIcon className='w-5 h-5' />
          </span>
        )}
      </div>
      <div
        className={classNames(
          'text-sm md:text-base',
          isDisabled && 'text-gray-500'
        )}
      >
        {name}
      </div>
    </button>
  )
}

export default Option
