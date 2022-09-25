import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { SContainer } from './styles'

interface PaginationProps {
  page: number
  total_pages: number
}

const maxItems = 6
const maxLeft = Math.ceil((maxItems - 1) / 2)

console.log(maxLeft)

const Pagination = ({ page, total_pages }: PaginationProps) => {
  const first = Math.max(page - maxLeft, 1)

  return (
    <SContainer>
      <MdChevronLeft size={32} />
      <ul className="numbers">
        {Array.from({
          length: maxItems,
        })
          .map((_, index) => index + first)
          .map((p, index) => (
            <li key={index}>
              <button className={page === p ? 'selected' : ''}>{p}</button>
            </li>
          ))}
      </ul>
      <MdChevronRight size={32} />
    </SContainer>
  )
}

export default Pagination
