import { Listbox } from '@headlessui/react'
import SelectIcon from '../../shared/icons/SelectIcon'
import { classNames } from '../../../utils/class-names'

const FilterSelect = ({ options, active, setActive }) => {
  return (
    <Listbox
      value={active}
      onChange={(value) => {
        setActive(value)
      }}
    >
      <div className='relative'>
        <span className='inline-block w-full rounded-md shadow-sm'>
          <Listbox.Button className='relative w-full py-3 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-gray-800 text-gray-400 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5'>
            <span className='block truncate text-base'>{active}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <SelectIcon />
            </span>
          </Listbox.Button>
        </span>

        <div className='absolute w-full mt-1 bg-gray-800 rounded-md shadow-lg z-10'>
          <Listbox.Options className='py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-60 focus:outline-none sm:text-sm sm:leading-5'>
            {options.map((name) => (
              <Listbox.Option
                key={name}
                value={name}
                className={({ active, selected }) => {
                  return classNames(
                    'relative py-2 pl-3 cursor-default select-none pr-9 text-base focus:outline-none',
                    active
                      ? 'bg-gray-700 text-gray-400 bg-opacity-50'
                      : 'text-gray-400',
                    selected ? 'bg-gray-600' : null
                  )
                }}
              >
                {({ active, selected }) => (
                  <span
                    className={classNames(
                      'block truncate',
                      selected ? 'text-white' : null
                    )}
                  >
                    {name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </div>
    </Listbox>
  )
}

export default FilterSelect
