import React from 'react'

const useActivatingConnector = (connector) => {
  const [activatingConnector, setActivatingConnector] = React.useState()

  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  return [activatingConnector, setActivatingConnector]
}

export default useActivatingConnector
