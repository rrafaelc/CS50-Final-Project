import { useEffect } from 'react'
import { MdMenu, MdFilterList, MdSearch } from 'react-icons/md'
import Image from 'next/image'

import { useDimension } from '../../context/dimensionContext'
import { useFilter } from '../../context/filterContext'

import { SMobileContainer, SDesktopContainer, SSearch, Menu } from './styles'
import colors from '../../styles/colors'

export default function Header() {
  const { width, setWidth } = useDimension()
  const { toggle } = useFilter()

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
      <MdMenu size={36} color={colors.white} />
      <SSearch isDesktop={false}>
        <input type="text" placeholder="Search" />
        <MdSearch size={24} color={colors.more_weak} />
      </SSearch>
      <MdFilterList size={36} color={colors.white} onClick={toggle} />
    </SMobileContainer>
  ) : (
    <SDesktopContainer>
      {width > 550 && (
        <Image src="/logo.svg" width={78} height={32} alt="Logo" />
      )}
      <SSearch isDesktop={true}>
        <input type="text" placeholder="Search" />
        <MdSearch size={32} color={colors.more_weak} />
      </SSearch>
      <Menu>
        <span>Home</span>
        <span>About</span>
        <span>Account</span>
        <span>Logout</span>
      </Menu>
    </SDesktopContainer>
  )
}
