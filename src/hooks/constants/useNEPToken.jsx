import { useWeb3React } from '@web3-react/core'
import { getNEPToken } from '../../config/stats'

export const useNEPToken = () => {
  const { chainId } = useWeb3React()
  const token = getNEPToken(chainId)

  return {
    token
  }
}
