import { useWeb3React } from '@web3-react/core'
import KeyPoint from './KeyPoint'
import styles from './index.module.css'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
import BigNumber from 'bignumber.js'
import { formatWeiToNumber } from '../../../utils/formatter'

const PrimaryPane = ({ children, data }) => {
  const { active } = useWeb3React()

  return (
    <div className={styles.primary_pane}>
      <img src={data.logo} width='72' />
      <div className='mt-4 mb-2 text-center'>
        <h3 className='text-lg font-medium tracking-wider'>{data.name}</h3>
        {active && hasValue(data.staked) && (
          <p
            className='text-xs font-bold text-gray-400'
            title={
              convertFromUnits(data.staked)
                .decimalPlaces(2, BigNumber.ROUND_DOWN)
                .toNumber() +
              ' ' +
              data.liquidity
            }
          >
            {formatWeiToNumber(data.staked)} {data.liquidity}
          </p>
        )}
      </div>
      {children}
      <div className='mt-6 px-5 pt-4 mb-1 flex flex-wrap gap-3'>
        {data.features.map((x) => (
          <KeyPoint key={x.invariant} text={x.invariant} className={x.style} />
        ))}
      </div>
    </div>
  )
}

export default PrimaryPane
