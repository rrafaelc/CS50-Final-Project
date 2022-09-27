import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { STvEpisodes, SButtons, SCard, SImage } from './styles'
import Image from 'next/image'

import axios from 'lib/axios'

interface TvProps {
  id: number
  name: string
  poster_path: string
  genres: {
    name: string
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

  const [type, setType] = useState('')
  const [tv, setTv] = useState<TvProps>({} as TvProps)
  const [movie, setMovie] = useState<MovieProps>({} as MovieProps)
  const [season, setSeason] = useState('1')
  const [episode, setEpisode] = useState('1')
  const [status, setStatus] = useState<StatusProps | null>(null)

  const handleSave = () => {
    if (!status) {
      alert('Please select one status')
      return
    }

    if (type === 'tv') {
      let genre = ''
      if (!Number(season) || !Number(episode)) {
        alert('Season and episode must be only numbers')

        return
      }

      tv.genres.forEach((g, index) => {
        if (index + 1 !== tv.genres.length) {
          genre += `${g.name},`

          return
        }

        genre += g.name
      })

      axios
        .post('/api/create', {
          apiId: tv.id,
          mediaType: type,
          title: tv.name,
          genre,
          status,
          season: Number(season),
          episode: Number(episode),
          poster: tv.poster_path,
        })
        .then(() => router.push('/dashboard'))
        .catch(err => {
          console.log(err)

          alert(err.response.data)
        })
    }
  }

  const handleGoBack = () => {
    router.push({
      pathname: '/search',
      query: { query: tv.name ?? movie.title },
    })
  }

  useEffect(() => {
    if (router.isReady) {
      const { id, type } = router.query

      setType(String(type))

      if (type === 'tv') {
        axios
          .get(`/api/tmdb/search/tv/${id}`)
          .then(res => res.data)
          .then(data => {
            setTv({
              id: data.id,
              name: data.name,
              poster_path: data.poster_path,
              genres: data.genres,
            })
          })
          .catch(err => {
            console.log(err)
            alert('Error to get TV')
          })
      }
    }
  }, [router.isReady])

  return (
    <SCard>
      <h1>{type === 'tv' ? tv.name : movie.title}</h1>
      <SImage>
        <Image
          src={`https://image.tmdb.org/t/p/w220_and_h330_face${
            type === 'tv' ? tv.poster_path : movie.poster_path
          }`}
          layout="fill"
        />
      </SImage>
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
        <button className="save" onClick={handleSave}>
          Save
        </button>
        <button onClick={handleGoBack}>GO BACK</button>
      </SButtons>
    </SCard>
  )
}
