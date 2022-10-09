import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Status from '../Status'
import { getAll, updateTV, updateMovie, getOne } from 'lib/db'

import { useModalStatus } from 'context/modalStatusContext'
import { useRouter } from 'next/router'

import { StatusProps } from 'types'
import { searchTV } from 'lib/tmdb'
import { MdClose, MdSearch } from 'react-icons/md'
import colors from 'styles/colors'

import {
  SContainer,
  SSearchCards,
  SModal,
  SStatus,
  SStatusTitle,
} from './styles'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
  const router = useRouter()

  const [data, setData] = useState<StatusProps[]>([])
  const [dataSearchCard, setDataSearchCard] = useState<StatusProps[]>([])
  const [searchCardQuery, setSearchCardQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const watching: StatusProps[] = []
  const completed: StatusProps[] = []
  const onhold: StatusProps[] = []
  const dropped: StatusProps[] = []
  const ptw: StatusProps[] = []

  const watchingCard: StatusProps[] = []
  const completedCard: StatusProps[] = []
  const onholdCard: StatusProps[] = []
  const droppedCard: StatusProps[] = []
  const ptwCard: StatusProps[] = []

  data.forEach(elem => {
    elem.status === 'watching' && watching.push(elem)
    elem.status === 'completed' && completed.push(elem)
    elem.status === 'onhold' && onhold.push(elem)
    elem.status === 'dropped' && dropped.push(elem)
    elem.status === 'ptw' && ptw.push(elem)
  })

  dataSearchCard.forEach(elem => {
    elem.status === 'watching' && watchingCard.push(elem)
    elem.status === 'completed' && completedCard.push(elem)
    elem.status === 'onhold' && onholdCard.push(elem)
    elem.status === 'dropped' && droppedCard.push(elem)
    elem.status === 'ptw' && ptwCard.push(elem)
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
              router.push('/dashboard')

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
        router.push('/dashboard')
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
        router.push('/dashboard')
      }
    } catch (err: any) {
      setLoading(false)
      console.log(err.message)

      toast.error('An error occcurred while updating status')
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
    } catch (err: any) {
      setLoading(false)
      console.log(err.message)
      toast.error('An error occcurred while updating season')
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
    } catch (err: any) {
      setLoading(false)
      console.log(err.message)
      toast.error('An error occcurred while updating episode')
    }
  }

  const deletedMedia = (id: string) => {
    const updateData = data.filter(d => d.id !== id)
    const updateDataSearchCard = dataSearchCard.filter(d => d.id !== id)

    setData(updateData)
    setDataSearchCard(updateDataSearchCard)
  }

  useEffect(() => {
    async function getData() {
      const res = await getAll<StatusProps[]>()

      setData(res)
    }

    getData()
  }, [])

  useEffect(() => {
    if (searchCardQuery.trim() === '') {
      setDataSearchCard([])

      return
    }

    setDataSearchCard(
      data.filter(d => {
        if (d.title.toLowerCase().includes(searchCardQuery.toLowerCase())) {
          return d
        }
      })
    )
  }, [searchCardQuery])

  return (
    <SContainer>
      <SSearchCards>
        <input
          placeholder="Search cards"
          value={searchCardQuery}
          onChange={e => setSearchCardQuery(e.target.value)}
        />
        <button type="submit">
          <MdSearch size={30} color={colors.more_weak} />
        </button>
      </SSearchCards>
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
      <SStatus
        style={
          searchCardQuery && watchingCard.length === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <SStatusTitle>
          <p>
            Watching ({!searchCardQuery ? watching.length : watchingCard.length}
            )
          </p>
        </SStatusTitle>
        <Status
          deletedMedia={deletedMedia}
          data={!searchCardQuery ? watching : watchingCard}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus
        style={
          searchCardQuery && completedCard.length === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <SStatusTitle>
          <p>
            Completed (
            {!searchCardQuery ? completed.length : completedCard.length})
          </p>
        </SStatusTitle>
        <Status
          deletedMedia={deletedMedia}
          data={!searchCardQuery ? completed : completedCard}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus
        style={
          searchCardQuery && onholdCard.length === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <SStatusTitle>
          <p>
            On Hold ({!searchCardQuery ? onhold.length : onholdCard.length})
          </p>
        </SStatusTitle>
        <Status
          deletedMedia={deletedMedia}
          data={!searchCardQuery ? onhold : onholdCard}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus
        style={
          searchCardQuery && droppedCard.length === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <SStatusTitle>
          <p>
            Dropped ({!searchCardQuery ? dropped.length : droppedCard.length})
          </p>
        </SStatusTitle>
        <Status
          deletedMedia={deletedMedia}
          data={!searchCardQuery ? dropped : droppedCard}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
      <SStatus
        style={
          searchCardQuery && ptwCard.length === 0
            ? { display: 'none' }
            : { display: 'block' }
        }
      >
        <SStatusTitle>
          <p>
            Plan to watch ({!searchCardQuery ? ptw.length : ptwCard.length})
          </p>
        </SStatusTitle>
        <Status
          deletedMedia={deletedMedia}
          data={!searchCardQuery ? ptw : ptwCard}
          addOneSeason={addOneSeason}
          addOneEpisode={addOneEpisode}
        />
      </SStatus>
    </SContainer>
  )
}

export default Dashboard
