import { classNames } from '../../utils/class-names'
import { LoadingIcon } from './LoadingIcon'

export const RegularButton = ({
  children,
  isProcessing,
  isDisabled,
  ...props
}) => {
  let btnClass =
    'bg-blue-600 focus:border-blue-700 text-white hover:bg-blue-500'
  if (isProcessing) {
    btnClass = 'bg-blue-500 focus:border-opacity-0 text-white'
  }
  if (isDisabled) {
    btnClass = 'bg-gray-500 focus:border-opacity-0 text-gray-800'
  }

  return (
    <button
      type='button'
      className={classNames(
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition ease-in-out duration-150',
        btnClass,
        isProcessing || isDisabled ? 'cursor-not-allowed' : ''
      )}
      disabled={isProcessing || isDisabled}
      {...props}
    >
      {isProcessing && <LoadingIcon />}
      {children}
    </button>
  )
}
