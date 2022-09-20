import React, { createContext, useCallback, useContext, useState } from 'react'

interface FilterContextData {
  isOpen: boolean
  toggle: () => void
}

interface Props {
  children: React.ReactNode
}

const FilterContext = createContext<FilterContextData>({} as FilterContextData)

const FilterProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <FilterContext.Provider
      value={{
        isOpen,
        toggle,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const useFilter = (): FilterContextData => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useContext must be used within an FilterProvider')
  }

  return context
}

export { FilterProvider, useFilter }
