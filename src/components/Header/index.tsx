import { FormEventHandler, useEffect, useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { MdMenu, MdFilterList, MdSearch } from 'react-icons/md'

import { useDimension } from 'context/dimensionContext'
import { useFilter } from 'context/filterContext'
import { useHeader } from 'context/headerContext'

import { SMobileContainer, SDesktopContainer, SSearch, Menu } from './styles'
import colors from 'styles/colors'

export default function Header() {
  const router = useRouter()
  const { width, setWidth } = useDimension()
  const { query, setHeaderQuery } = useHeader()
  const { toggle } = useFilter()
  // const [query, setQuery] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()

    router.push({
      pathname: '/search',
      query: { query },
    })
  }

  useEffect(() => {
    if (typeof window !== undefined) {
      setWidth(window.innerWidth)

      window.addEventListener('resize', () => setWidth(window.innerWidth))

      return () =>
        window.removeEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [setWidth])

  return width < 500 ? (
    <SMobileContainer>
      {/* menu go to dashboard temp for mobile */}
      <MdMenu
        size={36}
        color={colors.white}
        onClick={() => router.push('/dashboard')}
      />
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
      <MdFilterList size={36} color={colors.white} onClick={toggle} />
    </SMobileContainer>
  ) : (
    <SDesktopContainer>
      {width > 550 && (
        <Image
          src="/logo.svg"
          width={78}
          height={32}
          alt="Logo"
          onClick={() => router.push('/dashboard')}
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
        <span onClick={() => router.push('/dashboard')}>Home</span>
        <span>About</span>
        <span>Account</span>
        <span onClick={() => signOut()}>Logout</span>
      </Menu>
    </SDesktopContainer>
  )
}
