import { useState } from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (!process.browser) return

    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
    }

    return initialValue
  })

  const getLiveData = () => {
    let liveStoredData = storedValue
    try {
      const item = window.localStorage.getItem(key)
      liveStoredData = item ? JSON.parse(item) : initialValue
    } catch (error) {}

    return liveStoredData
  }

  const setValue = (value) => {
    if (!process.browser) return

    try {
      const valueToStore =
        value instanceof Function ? value(getLiveData()) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue, getLiveData]
}
