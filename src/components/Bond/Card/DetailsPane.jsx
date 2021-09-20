import CakeIcon from '../../shared/icons/CakeIcon'
import CardDetail from '../../shared/CardDetail'
import { getBondDetails } from '../../../utils/data/bond'

const DetailsPane = ({ data }) => {
  const isPancakeLinked = true
  const details = getBondDetails(data)

  return (
    <div className='p-6'>
      <div className='flex justify-end mb-4 opacity-30 h-6'>
        {isPancakeLinked && <CakeIcon />}
      </div>
      <div className='flex flex-wrap justify-between gap-y-2.5'>
        {details.map((x, idx) => {
          return (
            <CardDetail
              key={x.title}
              title={x.title}
              value={x.value}
              tooltip={x.tooltip}
              right={idx % 2 !== 0}
            />
          )
        })}
      </div>

      <div className='w-32 h-32 absolute bottom-0 right-0 pointer-events-none'>
        <img src={data.background} alt='pattern' className='w-full h-full' />
      </div>
    </div>
  )
}

export default DetailsPane
