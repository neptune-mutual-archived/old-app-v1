import { useContext } from 'react'

import { BondsContext } from '../context/bonds'

const useBondsContext = () => {
  return useContext(BondsContext)
}

export default useBondsContext
