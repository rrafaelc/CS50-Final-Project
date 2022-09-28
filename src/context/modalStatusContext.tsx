import React, { createContext, useCallback, useContext, useState } from 'react'

interface ModalStatusContextData {
  isOpen: boolean
  toggle: () => void
}

interface Props {
  children: React.ReactNode
}

const ModalStatusContext = createContext<ModalStatusContextData>(
  {} as ModalStatusContextData
)

const ModalStatusProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <ModalStatusContext.Provider
      value={{
        isOpen,
        toggle,
      }}
    >
      {children}
    </ModalStatusContext.Provider>
  )
}

const useModalStatus = (): ModalStatusContextData => {
  const context = useContext(ModalStatusContext)
  if (!context) {
    throw new Error('useContext must be used within an ModalStatusProvider')
  }

  return context
}

export { ModalStatusProvider, useModalStatus }
