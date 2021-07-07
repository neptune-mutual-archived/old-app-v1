import { classNames } from '../../utils/class-names'

export const IconButton = ({ label, children, small, ...props }) => {
  return (
    <button
      className={classNames(
        'px-3 rounded-md bg-blue-500 text-white',
        small ? 'py-1' : 'py-2'
      )}
      {...props}
    >
      <span className='sr-only'>{label}</span>
      {children}
    </button>
  )
}
