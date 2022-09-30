import { useEffect, useState } from 'react'
import Image from 'next/image'
import Status from '../Status'
import Filter from 'components/Filter'
import { getAll, updateTV, updateMovie, getOne } from 'lib/db'

import { useModalStatus } from 'context/modalStatusContext'
import { StatusProps } from 'types'
import { MdClose } from 'react-icons/md'

import { SContainer, SModal, SStatus, SStatusTitle } from './styles'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { searchTV } from 'lib/tmdb'

const Dashboard = () => {
  const {
    isOpen,
    id,
    name,
    poster,
    status,
    type,
    toggle,
    season,
    episode,
    setStatusFunction,
  } = useModalStatus()

  const [data, setData] = useState<StatusProps[]>([])
  const [loading, setLoading] = useState(false)

  const watching: StatusProps[] = []
  const completed: StatusProps[] = []
  const onhold: StatusProps[] = []
  const dropped: StatusProps[] = []
  const ptw: StatusProps[] = []

  data.forEach(elem => {
    elem.status === 'watching' && watching.push(elem)
    elem.status === 'completed' && completed.push(elem)
    elem.status === 'onhold' && onhold.push(elem)
    elem.status === 'dropped' && dropped.push(elem)
    elem.status === 'ptw' && ptw.push(elem)
  })

  const handleUpdate = async (status: string) => {
    setLoading(true)
    try {
      if (type === 'tv') {
        if (status === 'completed') {
          const tvDatabase = await getOne(id)

          if (tvDatabase) {
            const tv = await searchTV(String(tvDatabase.tvApiId))

            // All this data come for the tmdb api, and i selected the ones that i needed
            if (tv) {
              const episodeTotal = tv.seasons.filter(
                (s: any) => s.season_number === tv.number_of_seasons
              )

              await updateTV({
                id,
                status,
                season: tv.number_of_seasons,
                episode: episodeTotal[0].episode_count,
              })

              // update the list without reload
              const updateData = data.map(d => {
                if (d.id === id) {
                  return {
                    ...d,
                    updatedAt: new Date().toISOString(), // Just for let them be in first position
                    status,
                    season: tv.number_of_seasons,
                    episode: episodeTotal[0].episode_count,
                  }
                }

                return d
              })

              setData(updateData)

              toggle()
              setLoading(false)

              return
            }
          }
        }

        // If is not status = completed
        await updateTV({ id, status, season, episode })

        // update the list without reload
        const updateData = data.map(d => {
          if (d.id === id) {
            return {
              ...d,
              updatedAt: new Date().toISOString(), // Just for let them be in first position
              status,
            }
          }

          return d
        })

        setData(updateData)

        toggle()
        setLoading(false)
      }

      if (type === 'movie') {
        await updateMovie({ id, status })

        // update the list without reload
        const updateData = data.map(d => {
          if (d.id === id) {
            return {
              ...d,
              updatedAt: new Date().toISOString(), // Just for let them be in first position
              status,
            }
          }

          return d
        })

        setData(updateData)

        toggle()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)

      alert('An error occcurred while updating status')
    }
  }

  const handleStatus = (status: string) => {
    setStatusFunction(status)
    handleUpdate(status)
  }

  const addOneSeason = async (id: string) => {
    setLoading(true)

    try {
      const tv = await getOne<{
        season: number
        episode: number
      }>(id)

      await updateTV({
        id,
        status: 'watching',
        season: tv.season + 1,
        episode: tv.episode,
      })

      // update the list without reload
      const updateData = data.map(d => {
        if (d.id === id) {
          return {
            ...d,
            updatedAt: new Date().toISOString(), // Just for let them be in first position
            status: 'watching',
            season: tv.season + 1,
            episode: tv.episode,
          }
        }
        return d
      })
      setData(updateData)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert('An error occcurred while updating season')
    }
  }

  const addOneEpisode = async (id: string) => {
    setLoading(true)

    try {
      const tv = await getOne<{
        season: number
        episode: number
      }>(id)

      await updateTV({
        id,
        status: 'watching',
        season: tv.season,
        episode: tv.episode + 1,
      })

      // update the list without reload
      const updateData = data.map(d => {
        if (d.id === id) {
          return {
            ...d,
            updatedAt: new Date().toISOString(), // Just for let them be in first position
            status: 'watching',
            season: tv.season,
            episode: tv.episode + 1,
          }
        }
        return d
      })
      setData(updateData)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert('An error occcurred while updating episode')
    }
  }

  useEffect(() => {
    async function getData() {
      const res = await getAll<StatusProps[]>()

      setData(res)
    }

    getData()
  }, [])

  return (
    <SContainer>
      <Filter />
      {isOpen && (
        <SModal>
          <button disabled={loading} className="close" onClick={() => toggle()}>
            <MdClose size={24} />
          </button>
          <h1>Status</h1>

          <div className="content">
            <div className="poster">
              <h1>{name}</h1>

              <div className="image">
                <Image src={poster} layout="fill" />
              </div>
            </div>

            <div className="buttons">
              <button
                disabled={loading}
                onClick={() => handleStatus('watching')}
                className={`options watching ${
                  status === 'watching' && 'selected'
                }`}
              >
                Watching
              </button>
              <button
                disabled={loading}
                onClick={() => handleStatus('completed')}
                className={`options completed ${
                  status === 'completed' && 'selected'
                }`}
              >
                Completed
              </button>
              <button
                disabled={loading}
                onClick={() => handleStatus('dropped')}
                className={`options dropped ${
                  status === 'dropped' && 'selected'
                }`}
              >
                Dropped
              </button>
              <button
                disabled={loading}
                onClick={() => handleStatus('onhold')}
                className={`options onhold ${
                  status === 'onhold' && 'selected'
                }`}
              >
                On hold
              </button>
              <button
                disabled={loading}
                onClick={() => handleStatus('ptw')}
                className={`options ptw ${status === 'ptw' && 'selected'}`}
              >
                Plan to watch
              </button>
            </div>
          </div>
        </SModal>
      )}
      <SStatus>
        <SStatusTitle>
          <p>Watching ({watching.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status
          data={watching}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>Completed ({completed.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status
          data={completed}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>On Hold ({onhold.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status
          data={onhold}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>Dropped ({dropped.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status
          data={dropped}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>Plan to watch ({ptw.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status
          data={ptw}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
    </SContainer>
  )
}

export default Dashboard
