import { classNames } from '../../../utils/class-names'
import styles from './index.module.css'

export const FlipCard = ({ showBack, children, cardClass, cardBodyClass }) => {
  return (
    <div
      className={classNames(
        styles.flip_card,
        showBack ? styles.rotate : null,
        cardClass
      )}
    >
      <div className={classNames(styles.flip_card_body, cardBodyClass)}>
        {children}
      </div>
    </div>
  )
}

export const FlipCardFront = ({ children, className }) => {
  return (
    <div className={classNames(styles.flip_card_front, className)}>
      {children}
    </div>
  )
}

export const FlipCardBack = ({ children, className }) => {
  return (
    <div className={classNames(styles.flip_card_back, className)}>
      {children}
    </div>
  )
}
