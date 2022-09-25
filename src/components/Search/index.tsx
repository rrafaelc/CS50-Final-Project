import { useEffect, useRef, useState } from 'react'
import axios from 'lib/axios'
import Image from 'next/image'

import { useDimension } from 'context/dimensionContext'

import { SContainer, SCard, SImage, SButtons } from './styles'

interface ResultsProps {
  id: number
  name: string // Fot tv show
  title: string // For movie
  media_type: string
  poster_path: string
  genre_ids: number[]
}

const Search = () => {
  const [totalPages, setTotalPages] = useState(0)
  const [results, setResults] = useState<ResultsProps[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const lastElement = useRef<HTMLLIElement>(null)

  const { width } = useDimension()

  const loadMore = () => {
    if (page === totalPages) return
    setPage(page + 1)
  }

  useEffect(() => {
    setLoading(true)

    axios
      .get('/api/tmdb/search/', {
        params: {
          query: 'Breaking',
          page,
        },
      })
      .then(res => {
        setTotalPages(res.data.total_pages)
        setResults([...results, ...res.data.results])
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [page])

  useEffect(() => {
    if (loading) return
    if (!lastElement.current) return

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (totalPages === page) return

          loadMore()
        }
      })
    })

    intersectionObserver.observe(lastElement.current)

    return () => intersectionObserver.disconnect()
  }, [loading])

  return (
    <SContainer>
      {results &&
        results.map(d => {
          // Somehow they return undefined or null
          if (
            d.poster_path !== undefined &&
            d.poster_path !== null &&
            (d.media_type === 'tv' || d.media_type === 'movie')
          ) {
            // There is two types, one for tv show 'name' and other for movie 'title'
            const name = d.name ? d.name : d.title

            return (
              <SCard key={d.id}>
                <h1>{name}</h1>
                <SImage>
                  <Image
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face${d.poster_path}`}
                    layout="fill"
                  />
                </SImage>
                <SButtons>
                  <button>ADD</button>
                  <button>GO BACK</button>
                </SButtons>
              </SCard>
            )
          }
        })}
      {page !== totalPages && <SCard ref={lastElement}>Loading more</SCard>}
    </SContainer>
  )
}

export default Search
