import React from 'react'

import { DimensionProvider } from './dimensionContext'
import { FilterProvider } from './filterContext'

interface Props {
  children: React.ReactNode
}

// It's the Header component who set the width
export const AppProvider = ({ children }: Props) => {
  return (
    <DimensionProvider>
      <FilterProvider>{children}</FilterProvider>
    </DimensionProvider>
  )
}
