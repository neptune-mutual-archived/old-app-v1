import { calculateGasMargin, convertToUnits } from '../../utils/bignumbers'
import { useFarmContractInfo } from '../constants/useFarmContractInfo'
import { useContract } from '../useContract'

export const useFarm = ({ contract: _contract } = {}) => {
  const fallback = useFarmContractInfo()

  let contract = _contract
  if (!_contract || !_contract.address) {
    contract = fallback
  }

  const instance = useContract({ contract })

  const deposit = async ({ token, amount }) => {
    const toDeposit = convertToUnits(amount || 0).toString()

    const estimatedGas = await instance.estimateGas
      .deposit(toDeposit)
      .catch(() => instance.estimateGas.deposit(toDeposit.toString()))

    const tx = await instance.deposit(toDeposit, {
      gasLimit: calculateGasMargin(estimatedGas)
    })

    return tx
  }

  const withdraw = async ({ token, amount }) => {
    const toWithdraw = convertToUnits(amount || 0).toString()

    const estimatedGas = await instance.estimateGas
      .withdraw(toWithdraw)
      .catch(() => instance.estimateGas.withdraw(toWithdraw.toString()))

    const tx = await instance.withdraw(toWithdraw, {
      gasLimit: calculateGasMargin(estimatedGas)
    })

    return tx
  }

  const withdrawRewards = async ({ token }) => {
    const estimatedGas = await instance.estimateGas
      .withdrawRewards()
      .catch(() => instance.estimateGas.withdrawRewards())

    const tx = await instance.withdrawRewards({
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
