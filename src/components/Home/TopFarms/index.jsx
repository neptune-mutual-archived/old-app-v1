import { usePoolContext } from '../../../hooks/usePoolContext'
import { convertFromUnits } from '../../../utils/bignumbers'
import { formatWeiToNumber, percentFormatter } from '../../../utils/formatter'
import { Card } from '../Card'
import { FarmsTable } from './Table'

export const TopFarms = () => {
  const { pools, getDataById } = usePoolContext()

  const farms = pools
    .filter((x) => x.live)
    .map((x) => {
      const data = getDataById(x.id)

      return {
        name: data.liquidity,
        logo: data.logo,
        apy: percentFormatter(convertFromUnits(data.apy).toNumber()),
        tvl: formatWeiToNumber(data.tvl)
      }
    })

  return (
    <Card>
      <div className='h-full max-h-full flex flex-col'>
        <h5 className='mb-4 text-gray-400 font-bold text-xs xl:text-sm tracking-wider uppercase'>
          Top Farms
        </h5>
        <div>
          <FarmsTable farms={farms} />
        </div>
        {farms.length === 0 && <p className='m-auto'>Coming soon</p>}
      </div>
    </Card>
  )
}
