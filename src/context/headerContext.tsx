import React, { createContext, useCallback, useContext, useState } from 'react'

interface HeaderContextData {
  query: string
  setHeaderQuery: (query: string) => void
}

interface Props {
  children: React.ReactNode
}

const HeaderContext = createContext<HeaderContextData>({} as HeaderContextData)

const HeaderProvider = ({ children }: Props) => {
  const [query, setQuery] = useState('')

  const setHeaderQuery = useCallback(
    (query: string) => {
      setQuery(query)
    },
    [query]
  )

  return (
    <HeaderContext.Provider
      value={{
        query,
        setHeaderQuery,
      }}
    >
      {children}
    </HeaderContext.Provider>
  )
}

const useHeader = (): HeaderContextData => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useContext must be used within an HeaderProvider')
  }

  return context
}

export { HeaderProvider, useHeader }
