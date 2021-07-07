import { useContext } from 'react'

import { StatsContext } from '../context/stats'

export const useStatsContext = () => {
  return useContext(StatsContext)
}
