import { AddressZero } from '@ethersproject/constants'
import { convertToUnits } from '../../utils/bignumbers'
import { unixTimeAfter } from '../../utils/date'
import { useDiscoveryContractInfo } from '../constants/useDiscoveryContractInfo'
import { useContract } from '../useContract'

const composeBondSummary = (summary, account, requestedAt) => {
  const [
    poolTotalNepPaired,
    totalLocked,
    releaseDate,
    nepAmount,
    bondTokenAmount,
    liquidity,
    myNepRewards,
    tvl
  ] = summary

  const info = {
    poolTotalNepPaired: poolTotalNepPaired.toString(),
    totalLocked: totalLocked.toString(),
    releaseDate: releaseDate.toString(),
    nepAmount: nepAmount.toString(),
    bondTokenAmount: bondTokenAmount.toString(),
    liquidity: liquidity.toString(),
    myNepRewards: myNepRewards.toString(),
    tvl: tvl.toString(),
    account: account.toString(),
    requestedAt: requestedAt.toString()
  }

  return info
}

const composeFarmOrPoolSummary = (summary, account, requestedAt) => {
  const [
    rewards,
    staked,
    nepPerTokenPerBlock,
    totalTokensLocked,
    totalNepLocked,
    maxToStake,
    myNepRewards,
    totalNepRewards,
    tvl,
    apy,
    tokenPrice
  ] = summary

  const info = {
    account: account.toString(),
    rewards: rewards.toString(),
    staked: staked.toString(),
    nepPerTokenPerBlock: nepPerTokenPerBlock.toString(),
    totalTokensLocked: totalTokensLocked.toString(),
    totalNepLocked: totalNepLocked.toString(),
    maxToStake: maxToStake.toString(),
    myNepRewards: myNepRewards.toString(),
    totalNepRewards: totalNepRewards.toString(),
    tvl: tvl.toString(),
    apy: apy.toString(),
    tokenPrice: tokenPrice.toString(),
    requestedAt: requestedAt.toString()
  }

  return info
}

export const useDiscovery = ({ contract: _contract } = {}) => {
  const fallback = useDiscoveryContractInfo()

  let contract = _contract
  if (!_contract || !_contract.address) {
    contract = fallback
  }

  const instance = useContract({ contract })

  const getBondSummary = async ({ token, account = AddressZero }) => {
    try {
      const requestedAt = unixTimeAfter()
      const result = await instance.getBondSummary(
        token.address,
        account,
        convertToUnits(1).toString(),
        { gasLimit: convertToUnits(1).toString() }
      )

      return composeBondSummary(result, account, requestedAt)
    } catch (error) {
      console.error(error)
    }
  }

  const getPoolSummary = async ({ token, account, isLPToken }) => {
    const requestedAt = unixTimeAfter()
    const result = await instance.getPoolSummary(
      token.address,
      account,
      isLPToken,
      convertToUnits(1).toString()
    )

    return composeFarmOrPoolSummary(result, account, requestedAt)
  }

  const getFarmSummary = async ({ token, account }) => {
    const requestedAt = unixTimeAfter()
    const result = await instance.getFarmSummary(
      token.address,
      account,
      convertToUnits(1).toString()
    )

    return composeFarmOrPoolSummary(result, account, requestedAt)
  }

  const getFarmOrPoolSummary = async ({
    token,
    type,
    isLPToken,
    account = AddressZero
  }) => {
    if (type === 'Pool') {
      return getPoolSummary({ token, account, isLPToken })
    }
    if (type === 'Farm') {
      return getFarmSummary({ token, account })
    }
  }

  const totalNepSupply = async () => {
    try {
      const result = await instance.totalNepSupply()
      return result || '0'
    } catch (error) {
      console.log('Could not retrieve "totalNepSupply"')
    }
    return '0'
  }

  const totalBurned = async () => {
    try {
      const result = await instance.totalBurned()
      return result || '0'
    } catch (error) {
      console.log('Could not retrieve "totalBurned"')
    }
    return '0'
  }

  const totalRewardAllocation = async () => {
    try {
      const result = await instance.totalRewardAllocation()
      return result || '0'
    } catch (error) {
      console.log('Could not retrieve "totalRewardAllocation"')
    }
    return '0'
  }

  const getNEPPrice = async () => {
    try {
      const result = await instance.getNEPPrice(convertToUnits(1).toString())
      return result.toString() || '0'
    } catch (error) {
      console.log('Could not retrieve "getNEPPrice"')
    }
    return '0'
  }

  const getTokenAmountInBUSD = async ({ token }) => {
    try {
      const result = await instance.getTokenAmountInBUSD(
        token.address,
        convertToUnits(1).toString()
      )
      return result.toString() || '0'
    } catch (error) {
      console.log('Could not retrieve "getTokenAmountInBUSD"')
    }
    return '0'
  }

  return {
    getBondSummary,
    getFarmOrPoolSummary,
    totalNepSupply,
    totalBurned,
    totalRewardAllocation,
    getNEPPrice,
    getTokenAmountInBUSD
  }
}
