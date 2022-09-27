import { useEffect, useState } from 'react'
import axios from 'axios'
import Status from '../Status'
import Filter from 'components/Filter'

import { StatusProps } from 'types'

import { SContainer, SStatus, SStatusTitle } from './styles'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Dashboard = () => {
  const [data, setData] = useState<StatusProps[]>([])

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
