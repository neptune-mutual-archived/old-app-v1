import { useEffect, useState } from 'react'

import { hasValue } from '../utils/bignumbers'
import { useStatsContext } from './useStatsContext'

export const useGlobalLoader = () => {
  const [loading, setLoading] = useState(true)
  const [percent, setPercent] = useState(0)

  const { nepPrice, totalNepSupply } = useStatsContext()

  useEffect(() => {
    if (!hasValue(nepPrice)) {
      setLoading(true)
    }

    // Remove loader after 10s (to avoid showing loading screen forever)
    setTimeout(() => setLoading(false), 10 * 1000)
  }, [nepPrice])

  useEffect(() => {
    let fraction = 0
    if (hasValue(nepPrice)) fraction += 0.5
    if (hasValue(totalNepSupply)) fraction += 0.5

    setPercent(fraction * 100)
  }, [nepPrice, totalNepSupply])

  useEffect(() => {
    if (percent < 100) return

    setTimeout(() => setLoading(false), 200) // minor delay to fill the progressbar
  }, [percent])

  return {
    isLoading: loading,
    percent
  }
}
