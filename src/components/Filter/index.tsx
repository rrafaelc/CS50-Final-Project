import { SMobileContainer, STitle, SItems, SDesktopContainer } from './styles'

import { MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'

import { useFilter } from '../../context/filterContext'
import { useDimension } from '../../context/dimensionContext'

import colors from '../../styles/colors'
import { SyntheticEvent } from 'react'

export default function Filter() {
  const { isOpen, toggle } = useFilter()
  const { width } = useDimension()

  const handleToggleDetails = (event: SyntheticEvent) => {
    // https://github.com/facebook/react/issues/15486#issuecomment-488028431
    event.preventDefault()
    toggle()
  }

  return width < 500 ? (
    <SMobileContainer isOpen={isOpen}>
      <STitle>
        <h1>Filter</h1>
        <button onClick={toggle}>
          <MdClose size={24} color={colors.white} />
        </button>
      </STitle>
      <SItems>
        <button>Action</button>
        <button>Adventure</button>
        <button className="selected">Comedy</button>
        <button>Crime</button>
        <button>Drama</button>
        <button>Fantasy</button>
        <button>Horror</button>
        <button className="selected">Science Fiction</button>
      </SItems>
    </SMobileContainer>
  ) : (
    <SDesktopContainer>
      <details onClick={handleToggleDetails} open={isOpen}>
        <summary>
          Filter
          {isOpen ? (
            <MdKeyboardArrowUp size={24} color={colors.white} />
          ) : (
            <MdKeyboardArrowDown size={24} color={colors.white} />
          )}
        </summary>
        <SItems>
          <button>Action</button>
          <button>Adventure</button>
          <button className="selected">Comedy</button>
          <button>Crime</button>
          <button>Drama</button>
          <button>Fantasy</button>
          <button>Horror</button>
          <button className="selected">Science Fiction</button>
        </SItems>
      </details>
    </SDesktopContainer>
  )
}
