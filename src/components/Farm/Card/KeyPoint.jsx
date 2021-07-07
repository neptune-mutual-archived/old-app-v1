import styles from './index.module.css'
import { classNames } from '../../../utils/class-names'

const KeyPoint = ({ text, className }) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <div>
        <div className={styles.diamond} />
      </div>
      <div
        className={classNames(
          'font-bold tracking-widest text-xs leading-none uppercase',
          className
        )}
      >
        {text}
      </div>
    </div>
  )
}

export default KeyPoint
