import { useWeb3React } from '@web3-react/core'
import { Menu } from '@headlessui/react'
import { networks } from '../../../config/networks'
import MenuDropdown from '../../shared/Menu'
import styles from './index.module.css'
import {
  LogoutIcon,
  RefreshIcon,
  SwitchVerticalIcon
} from '@heroicons/react/outline'
import { truncateAddress } from '../../../utils/address'
import useAuth from '../../../hooks/useAuth'

const AccountMenu = ({ openConnectModal, openTransactionModal }) => {
  const { logout } = useAuth()
  const { account, chainId } = useWeb3React()

  const network = networks.find((x) => x.id === chainId) || {}

  const menuProps = {
    menuBtnClass: styles.connected,
    buttonText: truncateAddress(account),
    showDropdownIcon: false
  }

  return (
    <div className='flex gap-4 flex-wrap justify-end'>
      <div className={styles.networkName}>{network.shortName}</div>

      <MenuDropdown {...menuProps}>
        <Menu.Items
          static
          className='absolute right-0 w-56 mt-2 origin-top-right bg-gray-700  bg-opacity-80 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
        >
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={openConnectModal}
                  className={`${
                    active
                      ? 'bg-gray-600 text-gray-300'
                      : 'text-gray-400 hover:text-gray-300'
                  } group flex rounded-md items-center justify-between w-full px-2 py-2 text-sm`}
                >
                  <span> Change Network</span>
                  <RefreshIcon className='w-4 h-4' />
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={openTransactionModal}
                  className={`${
                    active
                      ? 'bg-gray-600 text-gray-300'
                      : 'text-gray-400 hover:text-gray-300'
                  } group flex rounded-md items-center justify-between w-full px-2 py-2 text-sm`}
                >
                  <span> View Transactions</span>
                  <SwitchVerticalIcon className='w-4 h-4' />
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active
                      ? 'bg-gray-600 text-gray-300'
                      : 'text-gray-400 hover:text-gray-300'
                  } group flex rounded-md items-center justify-between w-full px-2 py-2 text-sm`}
                >
                  <span> Logout</span>
                  <LogoutIcon className='w-4 h-4' />
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </MenuDropdown>
    </div>
  )
}

export default AccountMenu
