import Tippy from '@tippyjs/react'
import styles from './index.module.css'
import ProgressBar from '../../shared/ProgressBar'
import { formatToUTC, formatRelative } from '../../../utils/date'
import { convertFromUnits, hasValue } from '../../../utils/bignumbers'
import { InfoTooltip } from '../../shared/InfoTooltip'
import { amountFormatter } from '../../../utils/formatter'

const PrimaryPane = ({ openModal, modalTypes, children, info }) => {
  const relativeTime = formatRelative(info.endDate)

  const formattedLockedAmount = amountFormatter(
    convertFromUnits(info.totalLocked).toNumber()
  )

  return (
    <div className={styles.primary_pane}>
      <img src={info.logo} width='72' />
      <div className='mt-4 mb-2 flex flex-col items-center'>
        <h3 className='text-lg font-medium tracking-wider'>{info.name}</h3>
        <Tippy
          content={
            <span>
              {formattedLockedAmount} {info.name} bonded
            </span>
          }
          interactive
          animation='perspective'
        >
          <div className='my-2 mx-6 w-full' tabIndex='0'>
            <ProgressBar min={0} max={info.target} now={info.totalLocked} />
          </div>
        </Tippy>

        <p className='text-xs font-numbers text-gray-400 flex justify-center gap-2 mb-4'>
          {hasValue(info.releaseDate) && (
            <>
              <span title={info.endDate.toISOString()}>{relativeTime}</span>
              <InfoTooltip>
                <span>
                  This bond pool{' '}
                  {info.isEnded ? ' has ended ' : ' is going to end '}{' '}
                  {relativeTime} at UTC{' '}
                  {formatToUTC(info.endDate.toISOString())}.
                </span>
              </InfoTooltip>
            </>
          )}
        </p>
        {children}
      </div>
    </div>
  )
}

export default PrimaryPane
