import { useEffect, useState } from 'react'
import useBondFilterContext from '../../hooks/useBondFilterContext'
import useBondsContext from '../../hooks/useBondsContext'
import BondCard from './Card'
import { sort } from '../../utils/bignumbers'
import { getBondData } from '../../utils/data/bond'

const sortByKeys = {
  Default: null,
  'Total Value Locked': 'totalLocked',
  APY: 'apy'
}

export const ListBonds = () => {
  const { bonds, getInfoById, getSummaryById, getAllowanceById } =
    useBondsContext()
  const { sortBy, searchText } = useBondFilterContext()
  const [toShow, setToShow] = useState([])

  useEffect(() => {
    const filtered = bonds.filter((bond) => {
      try {
        return bond.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      } catch (error) {}
      return true
    })
    const sorted = sortByKeys[sortBy]
      ? sort(
          filtered,
          (bond) => {
            const data = getBondData(
              getInfoById(bond.id),
              getSummaryById(bond.id),
              getAllowanceById(bond.id)
            )

            return data[sortByKeys[sortBy]]
          },
          true
        )
      : filtered

    setToShow(sorted)
  }, [sortBy, searchText])

  return (
    <>
      {toShow.map((bond) => {
        const id = bond.id
        const info = getInfoById(id)
        const summary = getSummaryById(id)
        const allowance = getAllowanceById(id)

        const data = getBondData(info, summary, allowance)

        return <BondCard key={bond.name} id={bond.id} data={data} />
      })}
      {toShow.length === 0 && (
        <div className='text-center col-span-full text-gray-500'>
          No data found :(
        </div>
      )}
    </>
  )
}
