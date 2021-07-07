import { classNames } from '../../../utils/class-names'
import { useTransactionToast } from '../../../hooks/useTransactionToast'
import { convertFromUnits } from '../../../utils/bignumbers'
import { CounterAnimation } from '../../shared/CounterAnimation'
import { useFarmOrPool } from '../../../hooks/contracts/useFarmOrPool'

const Harvest = ({ data }) => {
  const { transactionPlaced, transactionError } = useTransactionToast()
  const farmOrPool = useFarmOrPool()

  const rewardAmount = convertFromUnits(data.rewards)
    .decimalPlaces(6)
    .toNumber()

  const onHarvest = async () => {
    try {
      const tx = await farmOrPool.withdrawRewards({
        type: data.type,
        token: data.token
      })

      await transactionPlaced(tx, {
        title: name,
        feature: 'Harvest',
        textPending: `Harvesting ${rewardAmount} ${data.rewardSymbol}`,
        textSuccess: `Harvested ${rewardAmount} ${data.rewardSymbol}`
      })
    } catch (error) {
      transactionError(error)
    }
  }

  return (
    <div className='flex flex-col gap-3 justify-start items-start mt-6'>
      <div className={classNames('text-lg font-normal font-numbers')}>
        <CounterAnimation value={rewardAmount} /> {data.rewardSymbol}
      </div>
      <button
        className='px-2 py-1 border-2 border-white rounded-md'
        onClick={onHarvest}
      >
        Harvest
      </button>
    </div>
  )
}

export default Harvest
