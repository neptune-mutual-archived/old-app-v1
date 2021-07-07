import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'

import { getProvider } from '../web3-react'

const getSigner = (library, account) => {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export const getProviderOrSigner = (_library, account) => {
  let library = _library

  if (!library) {
    library = getProvider()
  }

  if (!account) {
    return library
  }

  return getSigner(library, account)
}

export const getContract = (address, _library, abi, account = AddressZero) => {
  if (!address || !abi) {
    return
  }

  const signerOrProvider = getProviderOrSigner(_library, account)

  const instance = new Contract(address, abi, signerOrProvider)
  return instance
}
