import { useWeb3React } from '@web3-react/core'
import { getPoolContractInfo } from '../../config/stats'

export const usePoolContractInfo = () => {
  const { chainId } = useWeb3React()
  const contract = getPoolContractInfo(chainId)

  return contract
}
