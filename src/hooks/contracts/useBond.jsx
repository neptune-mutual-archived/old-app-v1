import {
  calculateGasMargin,
  convertToUnits,
  hasValue
} from '../../utils/bignumbers'
import { unixTimeAfter } from '../../utils/date'
import { useBondContractInfo } from '../constants/useBondContractInfo'
import { useContract } from '../useContract'

export const useBond = ({ contract: _contract } = {}) => {
  const fallback = useBondContractInfo()

  let contract = _contract
  if (!_contract || !_contract.address) {
    contract = fallback
  }

  const instance = useContract({ contract })

  const createBond = async ({ token, tokenAmount, nepAmount }) => {
    const minNep = '0'
    const txDeadline = unixTimeAfter(1 * 60 * 60) // 1 hour
    const toBondTokens = tokenAmount.toString()
    const toBondNep = nepAmount.toString()

    const estimatedGas = await instance.estimateGas
      .createBond(token.address, toBondTokens, toBondNep, minNep, txDeadline)
      .catch(() =>
        instance.estimateGas.createBond(
          token.address,
          toBondTokens,
          toBondNep,
          minNep,
          txDeadline
        )
      )

    const tx = await instance.createBond(
      token.address,
      toBondTokens,
      toBondNep,
      minNep,
      txDeadline,
      {
        gasLimit: calculateGasMargin(estimatedGas)
      }
    )
    return tx
  }

  const releaseBond = async ({ token }) => {
    const estimatedGas = await instance.estimateGas
      .releaseBond(token.address)
      .catch(() => instance.estimateGas.releaseBond(token.address))

    const tx = await instance.releaseBond(token.address, {
      gasLimit: calculateGasMargin(estimatedGas)
    })
    return tx
  }

  const getNepRequired = async ({ token, amount }) => {
    try {
      const amountIn = convertToUnits(amount).toString()
      const result = await instance.getNepRequired(token.address, amountIn)

      if (result && hasValue(result[0]) && hasValue(result[1])) {
        return result[0].toString()
      }

      return '0'
    } catch (error) {
      console.error(error)
    }
  }

  const _totalRewardAllocation = async () => {
    try {
      const result = await instance._totalRewardAllocation()
      return result.toString()
    } catch (error) {
      console.error(error)
    }
    return '0'
  }

  return {
    createBond,
    releaseBond,
    getNepRequired,
    _totalRewardAllocation
  }
}
