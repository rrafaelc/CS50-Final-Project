import { useEffect, useState } from 'react'
import Status from '../Status'
import Filter from 'components/Filter'
import { getAll, updateTV } from 'lib/db'

import { useModalStatus } from 'context/modalStatusContext'
import { StatusProps } from 'types'

import { SContainer, SModal, SStatus, SStatusTitle } from './styles'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import { MdClose } from 'react-icons/md'

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
    } catch (error) {
      setLoading(false)
      console.log(error)

      alert('An error occcurred while saving status')
    }

    setLoading(false)
  }

  const handleStatus = (status: string) => {
    setStatusFunction(status)
    handleUpdate(status)
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
            <h1>{name}</h1>

            <div className="image">
              <Image src={poster} layout="fill" />
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
        <Status data={watching} />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>Completed ({completed.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status data={completed} />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>On Hold ({onhold.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status data={onhold} />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>Dropped ({dropped.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status data={dropped} />
      </SStatus>
      <SStatus>
        <SStatusTitle>
          <p>Plan to watch ({ptw.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status data={ptw} />
      </SStatus>
    </SContainer>
  )
}

export default Dashboard
