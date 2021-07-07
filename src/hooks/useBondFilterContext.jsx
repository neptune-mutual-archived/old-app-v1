import { useContext } from 'react'

import { BondFilterContext } from '../context/bond-filter'

const useBondFilterContext = () => {
  return useContext(BondFilterContext)
}

export default useBondFilterContext
