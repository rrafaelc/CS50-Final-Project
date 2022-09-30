import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { deleteMedia, getOne, updateTV } from 'lib/db'
import Image from 'next/image'

import { STvEpisodes, SButtons, SCard, SImage } from './styles'

interface ApiProps {
  id: string
  title: string
  status: string
  season: number
  episode: number
  poster: string
  type: string
}

export default function Edit() {
  const router = useRouter()

  const [api, setApi] = useState({} as ApiProps)
  const [season, setSeason] = useState('1')
  const [episode, setEpisode] = useState('1')
  const [loading, setLoading] = useState(false)

  const handleGoBack = () => {
    router.push('/dashboard')
  }

  const handleUpdate = async () => {
    setLoading(true)

    if (!Number(season) || !Number(episode)) {
      alert('Season or Episode must be only numbers')

      return
    }

    try {
      await updateTV({
        id: api.id,
        status: api.status,
        season: Number(season),
        episode: Number(episode),
      })

      router.push('/dashboard')
    } catch (err) {
      console.log(err)
      setLoading(false)
      alert('An error occurred while updating')
    }
  }

  const handleDelete = async (id: string) => {
    // If false
    if (!confirm('Are you sure you want to delete?')) return

    setLoading(true)

    try {
      await deleteMedia(id)
    } catch (err) {
      console.log(err)
      setLoading(false)

      alert('An error occurred when deleting')
      return
    }

    router.push('/dashboard')
  }

  useEffect(() => {
    setLoading(true)

    if (router.isReady) {
      const { id } = router.query

      const getTv = async () => {
        try {
          const tv = await getOne<ApiProps>(String(id))

          if (tv.type === 'movie') {
            alert('Only tv show can be edited')
            router.push('/dashboard')
          }

          setApi(tv)
          setSeason(String(tv.season))
          setEpisode(String(tv.episode))

          setLoading(false)
        } catch {
          alert('ID not found')
          router.push('/dashboard')
        }
      }

      getTv()
    }
  }, [router.isReady])

  return (
    <SCard>
      <div className="poster">
        <h1>{api.title}</h1>
        <SImage>
          <Image
            src={`https://image.tmdb.org/t/p/w220_and_h330_face${api.poster}`}
            layout="fill"
          />
        </SImage>
      </div>

      <div className="right">
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

        <SButtons>
          <button
            disabled={loading}
            className="delete"
            onClick={() => handleDelete(api.id)}
          >
            {loading ? 'Loading' : 'Delete'}
          </button>
          <button disabled={loading} className="goback" onClick={handleGoBack}>
            {loading ? 'Loading' : 'Go Back'}
          </button>
          <button disabled={loading} className="update" onClick={handleUpdate}>
            {loading ? 'Loading' : 'Update'}
          </button>
        </SButtons>
      </div>
    </SCard>
  )
}
