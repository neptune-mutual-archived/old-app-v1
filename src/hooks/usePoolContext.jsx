import { useContext } from 'react'

import { PoolContext } from '../context/pool'

export const usePoolContext = () => {
  return useContext(PoolContext)
}
