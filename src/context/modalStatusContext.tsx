import React, { createContext, useCallback, useContext, useState } from 'react'
import { useEffect } from 'react'

interface ItemProps {
  id: string
  name: string
  poster: string
  type: string
  season?: number
  episode?: number
}

interface ModalStatusContextData {
  isOpen: boolean
  id: string
  name: string
  poster: string
  status: string
  type: string
  season: number
  episode: number
  toggle: () => void
  setStatusFunction: (status: string) => void
  setItemProps: ({ id, name, poster, type, season, episode }: ItemProps) => void
}

interface Props {
  children: React.ReactNode
}

const ModalStatusContext = createContext<ModalStatusContextData>(
  {} as ModalStatusContextData
)

const ModalStatusProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [poster, setPoster] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [season, setSeason] = useState(0)
  const [episode, setEpisode] = useState(0)

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const setStatusFunction = useCallback(
    (status: string) => {
      setStatus(status)
    },
    [status]
  )

  const setItemProps = useCallback(
    ({ id, name, poster, type, season, episode }: ItemProps) => {
      setId(id)
      setName(name)
      setPoster(poster)
      setType(type)
      season ? setSeason(season) : setSeason(1)
      episode ? setEpisode(episode) : setEpisode(1)
    },
    [id, name, poster, type, season, episode]
  )

  useEffect(() => {
    const body = document.querySelector('body')

    if (body) {
      body.style.overflow = isOpen ? 'hidden' : 'auto'
    }
  }, [isOpen])

  return (
    <ModalStatusContext.Provider
      value={{
        isOpen,
        id,
        name,
        poster,
        status,
        type,
        season,
        episode,
        toggle,
        setStatusFunction,
        setItemProps,
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
