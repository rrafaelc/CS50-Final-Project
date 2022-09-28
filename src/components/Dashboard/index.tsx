import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'lib/axios'
import Status from '../Status'
import Filter from 'components/Filter'
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
  const router = useRouter()

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
        await axios.put(`/api/tv/update/${id}`, {
          status,
          season,
          episode,
        })

        router.reload()
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
      const getAll = await axios.get<StatusProps[]>('/api/list')

      setData(getAll.data)
    }

    getData()
  }, [])

  return (
    <SContainer>
      <Filter />
      {isOpen && (
        <SModal>
          <div className="close" onClick={() => toggle()}>
            <MdClose size={24} />
          </div>
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
