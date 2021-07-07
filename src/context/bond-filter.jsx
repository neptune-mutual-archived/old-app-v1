import React, { useState } from 'react'

export const BondFilterContext = React.createContext()

const options = ['Default', 'Total Value Locked', 'APY']

export const BondFilterProvider = ({ children, value }) => {
  const [sortBy, setSortBy] = useState(options[0])
  const [searchText, setSearchText] = useState('')

  return (
    <BondFilterContext.Provider
      value={{ options, sortBy, setSortBy, searchText, setSearchText }}
    >
      {children}
    </BondFilterContext.Provider>
  )
}
