import { useContext } from 'react'

import { FarmFilterContext } from '../context/farm-filter'

const useFarmFilterContext = () => {
  return useContext(FarmFilterContext)
}

export default useFarmFilterContext
