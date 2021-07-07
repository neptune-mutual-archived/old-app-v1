import { useFarm } from './useFarm'
import { usePool } from './usePool'

export const useFarmOrPool = ({ contract } = {}) => {
  const farmInstance = useFarm({ contract })
  const poolInstance = usePool({ contract })

  const withdrawRewards = ({ type, token }) => {
    if (type === 'Pool') {
      return poolInstance.withdrawRewards({ token })
    }

    if (type === 'Farm') {
      return farmInstance.withdrawRewards({ token })
    }
    console.log('Incorrect object type')
  }

  const deposit = async ({ type, token, amount }) => {
    if (type === 'Pool') {
      return poolInstance.deposit({ token, amount })
    }

    if (type === 'Farm') {
      return farmInstance.deposit({ token, amount })
    }
    console.log('Incorrect object type')
  }

  const withdraw = async ({ type, token, amount }) => {
    if (type === 'Pool') {
      return poolInstance.withdraw({ token, amount })
    }

    if (type === 'Farm') {
      return farmInstance.withdraw({ token, amount })
    }
    console.log('Incorrect object type')
  }

  return {
    withdrawRewards,
    deposit,
    withdraw
  }
}
