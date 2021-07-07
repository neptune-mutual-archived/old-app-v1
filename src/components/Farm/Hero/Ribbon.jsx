import TokensIcon from './TokensIcon'
import styles from './Ribbon.module.css'
import { usePoolContext } from '../../../hooks/usePoolContext'
import { convertFromUnits } from '../../../utils/bignumbers'
import { CounterAnimation } from '../../shared/CounterAnimation'

const Ribbon = () => {
  const { getSumOfTVL, totalNEPLocked } = usePoolContext()

  return (
    <div className={styles.ribbon}>
      <div className='flex gap-4 items-center' style={{ minWidth: '250px' }}>
        <div className={styles.ribbon__token}>
          <TokensIcon />
        </div>
        <div>
          <div className='font-normal font-numbers text-lg'>
            ${' '}
            <CounterAnimation
              value={convertFromUnits(getSumOfTVL() || 0)
                .decimalPlaces(6)
                .toNumber()}
            />
          </div>
          <div className='font-normal text-sm whitespace-nowrap'>
            Total Value Locked
          </div>
        </div>
      </div>
      <div className='flex gap-4 items-center' style={{ minWidth: '250px' }}>
        <div className={styles.ribbon__token}>
          <TokensIcon />
        </div>
        <div>
          <div className='font-normal font-numbers text-lg'>
            <CounterAnimation
              value={convertFromUnits(totalNEPLocked || 0)
                .decimalPlaces(6)
                .toNumber()}
            />{' '}
            NEP
          </div>
          <div className='font-normal text-sm whitespace-nowrap'>
            Total NEP Locked
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ribbon
