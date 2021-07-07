import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useBondContractInfo } from '../../hooks/constants/useBondContractInfo'
import useBondsContext from '../../hooks/useBondsContext'
import { useERC20 } from '../../hooks/contracts/useERC20'
import { useNEPToken } from '../../hooks/constants/useNEPToken'
import { usePoolContext } from '../../hooks/usePoolContext'
import { useStatsContext } from '../../hooks/useStatsContext'
import { convertFromUnits } from '../../utils/bignumbers'
import { CounterAnimation } from '../shared/CounterAnimation'
import { Card } from './Card'
import { TextStats } from './TextStats'

export const TotalValueLocked = () => {
  const { chainId } = useWeb3React()
  const { getSumOfTVL: getPoolTVL } = usePoolContext()
  const { bonds, summaries, tokenPrices, getTotalNepPaired } = useBondsContext()
  const { nepPrice } = useStatsContext()

  const nepToken = useNEPToken()
  const bondContract = useBondContractInfo()
  const erc20 = useERC20({ contract: nepToken.token })

  const [bondNEPBalance, setBondNEPBalance] = useState('0')

  useEffect(() => {
    const updateBondBalance = async () => {
      const result = await erc20.balanceOf(bondContract.address)
      setBondNEPBalance(result)
    }

    updateBondBalance()
  }, [chainId])

  let totalValueLocked = new BigNumber('0')
  bonds.forEach(({ id, token, discovery, bond, live }) => {
    const totalLocked =
      (summaries &&
        summaries[id] &&
        summaries[id].totalLocked &&
        convertFromUnits(summaries[id].totalLocked).toString()) ||
      '0'
    const tokenPrice = (
      (tokenPrices[id] && convertFromUnits(tokenPrices[id])) ||
      '0'
    ).toString()

    totalValueLocked = new BigNumber(totalLocked)
      .multipliedBy(tokenPrice)
      .plus(totalValueLocked)
  })

  const nepInBUSD = convertFromUnits(nepPrice || 0)

  totalValueLocked = totalValueLocked
    .plus(convertFromUnits(bondNEPBalance).multipliedBy(nepInBUSD))
    .plus(convertFromUnits(getTotalNepPaired()).multipliedBy(nepInBUSD))
    .plus(convertFromUnits(getPoolTVL().toString()))

  return (
    <Card>
      <TextStats
        title='Total Value Locked'
        value={
          <>
            {'$ '}
            <CounterAnimation
              value={totalValueLocked.decimalPlaces(2).toNumber()}
            />
          </>
        }
        footer='in rewards pool &amp; protocol'
      />
    </Card>
  )
}
