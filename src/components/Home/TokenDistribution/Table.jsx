import { Row } from './Row'

export const SupplyTable = ({ distros }) => {
  return (
    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden sm:rounded-lg'>
            <table className='min-w-full'>
              <thead>
                <tr className='sr-only'>
                  <th
                    scope='col'
                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Amount
                  </th>
                  <th
                    scope='col'
                    className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-700'>
                {distros.map((distro, idx) => (
                  <Row
                    key={idx}
                    name={distro.name}
                    amount={distro.amount}
                    percent={distro.percent}
                    color={distro.color}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
