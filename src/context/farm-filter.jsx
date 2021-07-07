import React, { useState } from 'react'

export const FarmFilterContext = React.createContext()

const options = ['Default', 'Total Value Locked', 'APY']

export const FarmFilterProvider = ({ children, value }) => {
  const [sortBy, setSortBy] = useState(options[0])
  const [searchText, setSearchText] = useState('')

  return (
    <FarmFilterContext.Provider
      value={{ options, sortBy, setSortBy, searchText, setSearchText }}
    >
      {children}
    </FarmFilterContext.Provider>
  )
}
