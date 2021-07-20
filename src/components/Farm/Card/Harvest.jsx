import { useState } from 'react'
import { classNames } from '../../../utils/class-names'
import { useTransactionToast } from '../../../hooks/useTransactionToast'
import { convertFromUnits } from '../../../utils/bignumbers'
import { CounterAnimation } from '../../shared/CounterAnimation'
import { useFarmOrPool } from '../../../hooks/contracts/useFarmOrPool'
import { OutlineButton } from '../../../components/Buttons/Outline'

const Harvest = ({ data }) => {
  const [pending, setIsPending] = useState(false)

  const { transactionPlaced, transactionError } = useTransactionToast()
  const farmOrPool = useFarmOrPool()

  const rewardAmount = convertFromUnits(data.rewards)
    .decimalPlaces(6)
    .toNumber()

  const onHarvest = async () => {
    try {
      setIsPending(true)
      const tx = await farmOrPool.withdrawRewards({
        type: data.type,
        token: data.token
      })

      await transactionPlaced(tx, {
        title: data.name,
        feature: 'Harvest',
        textPending: `Harvesting ${rewardAmount} ${data.rewardSymbol}`,
        textSuccess: `Harvested ${rewardAmount} ${data.rewardSymbol}`
      })
      setIsPending(false)
    } catch (error) {
      transactionError(error)
      setIsPending(false)
    }
  }

  return (
    <div className='flex flex-col gap-3 justify-start items-start mt-6'>
      <div className={classNames('text-lg font-normal font-numbers')}>
        <CounterAnimation value={rewardAmount} /> {data.rewardSymbol}
      </div>
      <OutlineButton isProcessing={pending} onClick={onHarvest} large>
        Harvest
      </OutlineButton>
    </div>
  )
}

export default Harvest
