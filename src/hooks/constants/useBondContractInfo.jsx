import { useWeb3React } from '@web3-react/core'
import { getBondContractInfo } from '../../config/stats'

export const useBondContractInfo = () => {
  const { chainId } = useWeb3React()
  const contract = getBondContractInfo(chainId)

  return contract
}
