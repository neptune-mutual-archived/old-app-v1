import { classNames } from '../../utils/class-names'
import { LoadingIcon } from './LoadingIcon'

export const OutlineButton = ({
  children,
  isProcessing,
  isDisabled,
  ...props
}) => {
  let btnClass =
    'text-white bg-gray-800 hover:bg-gray-900 focus:border-gray-700'
  if (isProcessing || isDisabled) {
    btnClass = 'border-gray-300 text-gray-300 cursor-not-allowed'
  }

  return (
    <button
      type='button'
      className={classNames(
        'inline-flex items-center px-4 py-2 border-2 border-white text-sm font-medium rounded-md transition ease-in-out duration-150',
        btnClass
      )}
      disabled={isProcessing || isDisabled}
      {...props}
    >
      {isProcessing && <LoadingIcon />}
      {children}
    </button>
  )
}
