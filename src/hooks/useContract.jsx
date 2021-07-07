import { useWeb3React } from '@web3-react/core'

import { getContract } from '../utils/blockchain/contract'

export const useContract = ({ contract }) => {
  const { library, account } = useWeb3React()

  try {
    const instance = getContract(
      contract.address,
      library,
      contract.abi,
      account
    )

    return instance
  } catch (error) {
    console.error('Could not get contract', error)
  }

  return null
}
