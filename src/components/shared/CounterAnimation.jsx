import { useRef } from 'react'
import { useCountUp } from 'use-count-up'
import { amountFormatter } from '../../utils/formatter'

/**
 *
 * @param {Object} props
 * @param {number} props.value
 */
export const CounterAnimation = ({ value }) => {
  const ref = useRef()
  const countUpAmountPrevious = ref.current

  const updateStorage = (val) => {
    if (ref.current === val) {
      return
    }
    ref.current = val
  }

  const { value: text } = useCountUp({
    autoResetKey: String(value),
    isCounting: true,
    start: countUpAmountPrevious,
    end: value,
    decimalPlaces: 6,
    // duration: 1,
    formatter: amountFormatter,
    onComplete: () => updateStorage(value)
  })

  return text
}
