import { getAddress } from '@ethersproject/address'

export const isAddress = (value) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export const truncateAddress = (address) => {
  const BEFORE_COUNT = 5
  const AFTER_COUNT = 4

  try {
    if (address.length < BEFORE_COUNT + AFTER_COUNT + 1) {
      return address
    }

    return (
      address.substr(0, BEFORE_COUNT) +
      '...' +
      address.substr(address.length - AFTER_COUNT)
    )
  } catch (error) {
    console.error(error)
  }

  return 'Error'
}
