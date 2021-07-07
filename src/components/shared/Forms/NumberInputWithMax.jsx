import { classNames } from '../../../utils/class-names'

const NumberInputWithMax = ({
  title,
  value,
  onChange,
  onMax,
  error = false,
  typeOfAmount
}) => {
  return (
    <>
      <label
        className='block mt-4 my-2 uppercase font-bold text-sm text-gray-400 tracking-wider'
        htmlFor='amount'
      >
        {title}
      </label>
      <div className='flex'>
        <div className='flex flex-grow'>
          <input
            type='number'
            required
            placeholder='0'
            min={0}
            value={value}
            onChange={onChange}
            className={classNames(
              'block w-full pl-4 py-3 pr-8 sm:text-sm rounded-lg rounded-tr-none rounded-br-none placeholder-gray-400 focus:outline-none no-arrow-input',
              error
                ? 'bg-red-900 bg-opacity-20 border border-r-0 border-red-400 text-red-400'
                : 'bg-gray-700 text-gray-200'
            )}
          />
          <div
            className={classNames(
              'px-3 flex items-center leading-none whitespace-nowrap',
              error
                ? 'bg-red-900 bg-opacity-20 border border-l-0 border-red-400 text-red-400'
                : 'bg-gray-700 text-gray-400'
            )}
          >
            {typeOfAmount}
          </div>
        </div>
        <button
          type='button'
          onClick={onMax}
          className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-tl-none rounded-bl-none rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
        >
          Max
        </button>
      </div>
      {error ? <div className='text-red-400 mt-2'>{error}</div> : null}
    </>
  )
}

export default NumberInputWithMax
