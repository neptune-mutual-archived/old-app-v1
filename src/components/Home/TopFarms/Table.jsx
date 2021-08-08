import { classNames } from '../../../utils/class-names'

export const FarmsTable = ({ farms }) => {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden sm:rounded-lg'>
            <table className='min-w-full text-xs'>
              <thead>
                <tr className='sr-only'>
                  <th
                    scope='col'
                    className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
                  >
                    TVL
                  </th>
                  <th
                    scope='col'
                    className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
                  >
                    APY
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-700 text-xs xl:text-sm'>
                {farms.map((farm, idx) => (
                  <tr key={idx}>
                    <td className='pr-4 py-2 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div>
                          <div className='font-medium text-gray-400'>
                            {idx + 1}
                          </div>
                        </div>
                        <div className='flex items-center flex-shrink-0 h-8 w-8 ml-4'>
                          <img
                            className='h-6 w-6'
                            src={farm.logo}
                            alt={farm.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='font-medium text-gray-300'>
                            {farm.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-2 whitespace-nowrap'>
                      <div className='text-gray-300'>$ {farm.tvl}</div>
                    </td>
                    <td className='px-4 py-2 whitespace-nowrap'>
                      <div
                        className={classNames(
                          '',
                          idx < 2 ? 'text-green-500' : 'text-gray-300'
                        )}
                      >
                        {farm.apy}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
