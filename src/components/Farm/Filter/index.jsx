import useFarmFilterContext from '../../../hooks/useFarmFilterContext'
import FilterSelect from '../../shared/FilterInputs/Listbox'
import SearchTextbox from '../../shared/FilterInputs/SearchTextbox'

const FarmFilterDropdown = () => {
  const { sortBy, setSortBy, options, searchText, setSearchText } =
    useFarmFilterContext()

  const selectProps = {
    options,
    active: sortBy,
    setActive: setSortBy
  }

  return (
    <>
      <div className='flex justify-center w-52 h-full'>
        <div className='w-full max-w-xs mx-auto'>
          <div className='space-y-1'>
            <FilterSelect {...selectProps} />
          </div>
        </div>
      </div>
      <SearchTextbox
        value={searchText}
        onChange={(ev) => {
          setSearchText(ev.target.value)
        }}
        onSearch={() => {}}
      />
    </>
  )
}

export default FarmFilterDropdown
