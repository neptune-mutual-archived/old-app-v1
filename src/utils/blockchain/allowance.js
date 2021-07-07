import { AddressZero } from '@ethersproject/constants'

import { getContract } from './contract'

export const getTokenAllowance = async ({
  library,
  token,
  spender,
  owner = AddressZero
}) => {
  try {
    const instance = getContract(token.address, library, token.abi, owner)

    const allowance = await instance.allowance(owner, spender)
    return allowance.toString()
  } catch (error) {
    console.log('Could not retrieve "allowance"')
  }

  return '0'
}
