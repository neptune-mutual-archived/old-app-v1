import { useWeb3React } from '@web3-react/core'
import { getFarmContractInfo } from '../../config/stats'

export const useFarmContractInfo = () => {
  const { chainId } = useWeb3React()
  const contract = getFarmContractInfo(chainId)

  return contract
}
