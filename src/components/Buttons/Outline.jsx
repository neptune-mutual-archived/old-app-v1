import { classNames } from '../../utils/class-names'
import { LoadingIcon } from './LoadingIcon'

export const OutlineButton = ({
  children,
  isProcessing,
  isDisabled,
  large,
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
        'inline-flex items-center border-2 border-white font-medium rounded-md transition ease-in-out duration-150',
        btnClass,
        large ? 'px-2 py-1' : 'text-sm px-4 py-2'
      )}
      disabled={isProcessing || isDisabled}
      {...props}
    >
      {isProcessing && <LoadingIcon />}
      {children}
    </button>
  )
}
