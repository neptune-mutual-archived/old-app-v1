import { useContext } from 'react'

import { GlobalContext } from '../context/global'

const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export default useGlobalContext
