import { useState } from 'react'
import Status from '../Status'

import parseDate from '../../lib/parseDate'
import { StatusProps } from '../../types'

import { SContainer, SStatus, SStatusTitle, SSwiper } from './styles'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import data from '../../data.json'

const Dashboard = () => {
  const all: StatusProps[] = []

  const watching: StatusProps[] = []
  const completed: StatusProps[] = []
  const onhold: StatusProps[] = []
  const dropped: StatusProps[] = []
  const ptw: StatusProps[] = []

  data.forEach(elem => {
    const { year, month, day } = parseDate(elem.update)

    const status = () => {
      switch (elem.status) {
        case 'watching':
          return elem.status

        case 'completed':
          return elem.status

        case 'onhold':
          return elem.status

        case 'dropped':
          return elem.status

        case 'ptw':
          return elem.status
        default:
          return 'watching'
      }
    }

    const item: StatusProps = {
      title: elem.title,
      season: elem.season,
      episode: elem.episode,
      status: status(),
      update: {
        year,
        month,
        day,
      },
      type: elem.type,
      poster: elem.poster,
    }

    item.status === 'watching' && watching.push(item)
    item.status === 'completed' && completed.push(item)
    item.status === 'onhold' && onhold.push(item)
    item.status === 'dropped' && dropped.push(item)
    item.status === 'ptw' && ptw.push(item)

    all.push(item)
  })

  return (
    <SContainer>
      <SStatus>
        <SStatusTitle>
          <p>Watching ({watching.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status data={watching} />
      </SStatus>

      <SStatus>
        <SStatusTitle>
          <p>All ({all.length})</p>
          <p>See all</p>
        </SStatusTitle>
        <Status data={all} />
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
