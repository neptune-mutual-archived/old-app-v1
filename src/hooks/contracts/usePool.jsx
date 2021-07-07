import { calculateGasMargin, convertToUnits } from '../../utils/bignumbers'
import { usePoolContractInfo } from '../constants/usePoolContractInfo'
import { useContract } from '../useContract'

export const usePool = ({ contract: _contract } = {}) => {
  const fallback = usePoolContractInfo()

  let contract = _contract
  if (!_contract || !_contract.address) {
    contract = fallback
  }

  const instance = useContract({ contract })

  const deposit = async ({ token, amount }) => {
    const toDeposit = convertToUnits(amount || 0).toString()

    const estimatedGas = await instance.estimateGas
      .deposit(token.address, toDeposit)
      .catch(() =>
        instance.estimateGas.deposit(token.address, toDeposit.toString())
      )

    const tx = await instance.deposit(token.address, toDeposit, {
      gasLimit: calculateGasMargin(estimatedGas)
    })

    return tx
  }

  const withdraw = async ({ token, amount }) => {
    const toWithdraw = convertToUnits(amount || 0).toString()

    const estimatedGas = await instance.estimateGas
      .withdraw(token.address, toWithdraw)
      .catch(() =>
        instance.estimateGas.withdraw(token.address, toWithdraw.toString())
      )

    const tx = await instance.withdraw(token.address, toWithdraw, {
      gasLimit: calculateGasMargin(estimatedGas)
    })
    return tx
  }

  const withdrawRewards = async ({ token }) => {
    const estimatedGas = await instance.estimateGas
      .withdrawRewards(token.address)
      .catch(() => instance.estimateGas.withdrawRewards(token.address))

    const tx = await instance.withdrawRewards(token.address, {
      gasLimit: calculateGasMargin(estimatedGas)
    })
    return tx
  }

  return {
    deposit,
    withdraw,
    withdrawRewards
  }
}
