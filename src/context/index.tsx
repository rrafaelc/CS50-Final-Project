import React from 'react'

import { DimensionProvider } from './dimensionContext'
import { ModalStatusProvider } from './modalStatusContext'
import { HeaderProvider } from './headerContext'

interface Props {
  children: React.ReactNode
}

// It's the Header component who set the width
export const AppProvider = ({ children }: Props) => {
  return (
    <DimensionProvider>
      <ModalStatusProvider>
        <HeaderProvider>{children}</HeaderProvider>
      </ModalStatusProvider>
    </DimensionProvider>
  )
}
