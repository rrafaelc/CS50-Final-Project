import { useEffect, useRef, useState } from 'react'
import { searchMulti } from 'lib/tmdb'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useHeader } from 'context/headerContext'

import {
  SContainer,
  SCard,
  SImage,
  SButtons,
  SLoading,
  SScrolToTop,
  SNotFound,
} from './styles'
import { MdArrowCircleUp } from 'react-icons/md'

interface ResultsProps {
  id: number
  name: string // For tv show
  first_air_date: string // For tv show
  title: string // For movie
  release_date: string // For movie
  media_type: string
  poster_path: string
}

const Search = () => {
  const router = useRouter()
  const { setHeaderQuery } = useHeader()

  const [totalPages, setTotalPages] = useState(-1)
  const [results, setResults] = useState<ResultsProps[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const lastElement = useRef(null)

  const { query } = router.query

  const loadMore = () => {
    setPage(page + 1)

    setLoading(true)

    // When the user type the url, like: http://localhost:3000/search?query=breaking+bad
    // It's need the router to be ready - https://stackoverflow.com/a/71879444
    if (router.isReady) {
      if (!query) {
        setTotalPages(0)
        setResults([])
        return
      }

      searchMulti({ query: String(query), page: page + 1 })
        .then(data => {
          // Filter by only the tv, movies and not null or undefined
          const resultParsed = data.results.filter((r: ResultsProps) => {
            if (
              r.poster_path !== undefined &&
              r.poster_path !== null &&
              (r.media_type === 'tv' || r.media_type === 'movie')
            ) {
              return r
            }
          })

          setTotalPages(data.total_pages)
          setResults([...results, ...resultParsed])
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }

  const handleScrollToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  const handleAdd = (id: number, type: string) => {
    router.push(`/search/add?id=${id}&type=${type}`)
  }

  useEffect(() => {
    setLoading(true)
    setPage(1)

    if (router.isReady) {
      if (!query) {
        setTotalPages(0)
        setResults([])
        return
      }

      setHeaderQuery(String(query))

      searchMulti({ query: String(query), page: 1 })
        .then(data => {
          // Filter by only the tv, movies and not null or undefined
          const resultParsed = data.results.filter((r: ResultsProps) => {
            if (
              r.poster_path !== undefined &&
              r.poster_path !== null &&
              (r.media_type === 'tv' || r.media_type === 'movie')
            ) {
              return r
            }
          })

          setTotalPages(data.total_pages)
          setResults(resultParsed)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [query, router.isReady])

  useEffect(() => {
    if (loading) return
    if (!lastElement.current) return

    const intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (totalPages === 0 || totalPages === -1) return
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
          // There is two types, one for tv show 'name' and other for movie 'title'
          const name = d.name ? d.name : d.title
          const type = d.media_type === 'tv' ? 'Tv Show' : 'Movie'

          return (
            <SCard key={d.id}>
              <h1>{name}</h1>
              <p>{d.first_air_date ?? d.release_date}</p>
              <p>{type}</p>
              <SImage>
                <Image
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${d.poster_path}`}
                  layout="fill"
                />
              </SImage>
              <SButtons>
                <button onClick={() => handleAdd(d.id, d.media_type)}>
                  ADD
                </button>
                <button onClick={() => router.push('/dashboard')}>
                  GO BACK
                </button>
              </SButtons>
            </SCard>
          )
        })}
      {totalPages === 0 ? (
        <SNotFound>No results</SNotFound>
      ) : (
        page !== totalPages && (
          <SLoading ref={lastElement}>
            <Image src="/loading.svg" layout="fill" />
          </SLoading>
        )
      )}
      <SScrolToTop onClick={() => handleScrollToTop()}>
        <MdArrowCircleUp size={32} />
      </SScrolToTop>
    </SContainer>
  )
}

export default Search
