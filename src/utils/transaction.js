import { AddressZero } from '@ethersproject/constants'

import { getProviderOrSigner } from './blockchain/contract'

export const getTransactionStatus = async ({ library, hash }) => {
  try {
    const signerOrProvider = getProviderOrSigner(library, AddressZero)

    const x = await signerOrProvider.provider.getTransactionReceipt(hash)
    return x.status
  } catch (error) {
    console.log('Could not get tx reciept from hash', hash)
    console.error(error)
  }

  return null
}
