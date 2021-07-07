import SearchIcon from '../../shared/icons/SearchIcon'

const SearchTextbox = ({ value, onChange, onSearch }) => {
  return (
    <div className='flex bg-gray-800 rounded-md overflow-hidden shadow-sm'>
      <input
        value={value}
        onChange={onChange}
        className='w-full bg-gray-800 text-gray-200 p-3 pr-2 focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
        type='text'
        placeholder='Search'
      />
      <button
        onClick={onSearch}
        className='w-auto flex justify-end items-center p-2 text-gray-400 hover:text-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300'
      >
        <SearchIcon />
      </button>
    </div>
  )
}

export default SearchTextbox
