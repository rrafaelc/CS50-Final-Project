import { FormEventHandler, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MdClose, MdOutlineAccountCircle, MdSearch } from 'react-icons/md'

import { useDimension } from 'context/dimensionContext'
import { useHeader } from 'context/headerContext'

import colors from 'styles/colors'
import {
  SMobileContainer,
  SMenu,
  SDesktopContainer,
  SSearch,
  Menu,
} from './styles'

export default function Header() {
  const router = useRouter()
  const { width, setWidth } = useDimension()
  const { query, setHeaderQuery } = useHeader()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    router.push({
      pathname: '/search',
      query: { query },
    })
  }

  useEffect(() => {
    const html = document.querySelector('html')

    if (width >= 500) {
      setMenuOpen(false)
    }

    if (html) {
      html.style.overflow = menuOpen && width <= 500 ? 'hidden' : 'auto'
    }

    if (typeof window !== undefined) {
      setWidth(window.innerWidth)

      window.addEventListener('resize', () => setWidth(window.innerWidth))

      return () =>
        window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [setWidth, menuOpen, width])

  return width < 500 ? (
    <SMobileContainer>
      {menuOpen && (
        <SMenu>
          <div className="container">
            <div className="header">
              <h1>Menu</h1>

              <button onClick={() => setMenuOpen(false)}>
                <MdClose size={24} />
              </button>
            </div>

            <div className="buttons">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  router.push('/account/edit')
                }}
              >
                Account
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  router.push('/about')
                }}
              >
                About
              </button>
              <button className="logout" onClick={() => signOut()}>
                Logout
              </button>
            </div>
          </div>
        </SMenu>
      )}
      <div
        className="logo"
        onClick={() => {
          setHeaderQuery('')
          router.push('/dashboard')
        }}
      >
  <Image src="/logo.svg" alt="Logo" fill />
      </div>

      <SSearch onSubmit={handleSubmit} isDesktop={false}>
        <input
          placeholder="Search"
          value={query}
          onChange={e => setHeaderQuery(e.target.value)}
        />
        <button type="submit">
          <MdSearch size={24} color={colors.more_weak} />
        </button>
      </SSearch>
      <button className="account" onClick={() => setMenuOpen(true)}>
        <MdOutlineAccountCircle size={36} color={colors.white} />
      </button>
    </SMobileContainer>
  ) : (
    <SDesktopContainer>
      {width > 550 && (
        <Image
          src="/logo.svg"
          width={78}
          height={32}
          alt="Logo"
          onClick={() => {
            setHeaderQuery('')
            router.push('/dashboard')
          }}
          style={{ cursor: 'pointer' }}
        />
      )}

      <SSearch onSubmit={handleSubmit} isDesktop={true}>
        <input
          placeholder="Search"
          value={query}
          onChange={e => setHeaderQuery(e.target.value)}
        />
        <button type="submit">
          <MdSearch size={32} color={colors.more_weak} />
        </button>
      </SSearch>
      <Menu>
        <Link
          href="/dashboard"
          onClick={() => {
            setHeaderQuery('')
            router.push('/dashboard')
          }}
        >
          Home
        </Link>
        <Link href="/account/edit">Account</Link>
        <Link href="/about">About</Link>
        <a onClick={() => signOut()}>
          Logout
        </a>
      </Menu>
    </SDesktopContainer>
  )
}
