import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const MenuDropdown = ({
  menuBtnClass,
  buttonText,
  showDropdownIcon,
  children
}) => {
  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        {({ open }) => (
          <>
            <div>
              <Menu.Button className={menuBtnClass}>
                {buttonText}
                {showDropdownIcon && (
                  <ChevronDownIcon
                    className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
                    aria-hidden='true'
                  />
                )}
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              {children}
            </Transition>
          </>
        )}
      </Menu>
    </>
  )
}

export default MenuDropdown
