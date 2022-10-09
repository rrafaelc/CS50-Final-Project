import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createTVorMovie } from 'lib/db'
import { searchTV, searchMovie } from 'lib/tmdb'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { useHeader } from 'context/headerContext'

import { STvEpisodes, SButtons, SCard, SImage } from './styles'

interface TvProps {
  id: number
  name: string
  poster_path: string
  number_of_seasons: number
  seasons: {
    episode_count: number
    season_number: number
  }[]
}

interface MovieProps {
  id: number
  title: string
  poster_path: string
}

type StatusProps = 'watching' | 'completed' | 'dropped' | 'onhold' | 'ptw'

export default function Add() {
  const router = useRouter()
  const { query, setHeaderQuery } = useHeader()

  const [type, setType] = useState('')
  const [tv, setTv] = useState<TvProps>({} as TvProps)
  const [movie, setMovie] = useState<MovieProps>({} as MovieProps)
  const [season, setSeason] = useState('1')
  const [episode, setEpisode] = useState('1')
  const [status, setStatus] = useState<StatusProps | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSave = () => {
    if (!status) {
      toast.info('Please select one status')
      return
    }

    if (type === 'tv') {
      if (!Number(season) || !Number(episode)) {
        toast.info('Season and episode must be only numbers')

        return
      }

      setLoading(true)

      createTVorMovie({
        apiId: tv.id,
        mediaType: type,
        title: tv.name,
        status,
        season: Number(season),
        episode: Number(episode),
        poster: tv.poster_path,
      })
        .then(() => {
          setHeaderQuery('')
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
          setLoading(false)

          toast.error(err.response.data)
        })
    }

    if (type === 'movie') {
      setLoading(true)

      createTVorMovie({
        apiId: movie.id,
        mediaType: type,
        title: movie.title,

        status,
        poster: movie.poster_path,
      })
        .then(() => {
          setHeaderQuery('')
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
          setLoading(false)

          toast.error(err.response.data)
        })
    }
  }

  const handleGoBack = () => {
    router.push({
      pathname: '/search',
      query: { query },
    })
  }

  useEffect(() => {
    setLoading(true)
    if (router.isReady) {
      const { id, type } = router.query

      setType(String(type))

      if (type === 'tv') {
        searchTV(String(id))
          .then(data => {
            setTv({
              id: data.id,
              name: data.name,
              poster_path: data.poster_path,
              number_of_seasons: data.number_of_seasons,
              seasons: data.seasons,
            })
            setLoading(false)
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            toast.error('Error to get TV')
            router.push('/dashboard')
          })
      }

      if (type === 'movie') {
        searchMovie(String(id))
          .then(data => {
            setMovie({
              id: data.id,
              title: data.title,
              poster_path: data.poster_path,
            })
            setLoading(false)
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
            toast.error('Error to get Movie')
            router.push('/dashboard')
          })
      }
    }
  }, [router.isReady])

  useEffect(() => {
    if (type === 'tv' && status === 'completed') {
      setSeason(String(tv.number_of_seasons))
      const episode = tv.seasons.filter(
        s => s.season_number === tv.number_of_seasons
      )
      setEpisode(String(episode[0].episode_count))
    } else if (type === 'tv' && status === 'ptw') {
      setSeason('1')
      setEpisode('1')
    }
  }, [status])

  return (
    <SCard>
      <div>
        <div className="poster">
          <h1>{type === 'tv' ? tv.name : movie.title}</h1>
          <SImage>
            <Image
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${
                type === 'tv' ? tv.poster_path : movie.poster_path
              }`}
              layout="fill"
            />
          </SImage>
        </div>
        {type === 'tv' && (
          <STvEpisodes>
            <div>
              <span>Season</span>
              <input
                type="number"
                min={1}
                value={season}
                onChange={e => setSeason(e.target.value)}
              />
            </div>
            <div>
              <span>Episode</span>
              <input
                type="number"
                min={1}
                value={episode}
                onChange={e => setEpisode(e.target.value)}
              />
            </div>
          </STvEpisodes>
        )}
      </div>
      <SButtons>
        <button
          onClick={() => setStatus('watching')}
          className={`options watching ${status === 'watching' && 'selected'}`}
        >
          Watching
        </button>
        <button
          onClick={() => setStatus('completed')}
          className={`options completed ${
            status === 'completed' && 'selected'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setStatus('dropped')}
          className={`options dropped ${status === 'dropped' && 'selected'}`}
        >
          Dropped
        </button>
        <button
          onClick={() => setStatus('onhold')}
          className={`options onhold ${status === 'onhold' && 'selected'}`}
        >
          On hold
        </button>
        <button
          onClick={() => setStatus('ptw')}
          className={`options ptw ${status === 'ptw' && 'selected'}`}
        >
          Plan to watch
        </button>
        <button disabled={loading} className="save" onClick={handleSave}>
          {loading ? 'Loading' : 'Save'}
        </button>
        <button disabled={loading} onClick={handleGoBack}>
          {loading ? 'Loading' : 'GO BACK'}
        </button>
      </SButtons>
    </SCard>
  )
}
