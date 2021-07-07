import { MaxUint256 } from '@ethersproject/constants'
import { calculateGasMargin } from '../../utils/bignumbers'
import { useContract } from '../useContract'

export const useERC20 = ({ contract } = {}) => {
  const instance = useContract({ contract })

  const approve = async ({ spender }) => {
    const estimatedGas = await instance.estimateGas
      .approve(spender.address, MaxUint256)
      .catch(() =>
        instance.estimateGas.approve(spender.address, MaxUint256.toString())
      )

    const tx = await instance.approve(spender.address, MaxUint256, {
      gasLimit: calculateGasMargin(estimatedGas)
    })

    return tx
  }

  const balanceOf = async (address) => {
    if (!instance) {
      return '0'
    }

    try {
      const result = await instance.balanceOf(address)
      return result.toString()
    } catch (error) {
      console.error(error)
    }
    return '0'
  }

  return {
    approve,
    balanceOf
  }
}
