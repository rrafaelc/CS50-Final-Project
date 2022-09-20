import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Navigation, Pagination } from 'swiper'
import Card from '../Card'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { useDimension } from '../../context/dimensionContext'

import { StatusProps } from '../../types'

import { SContainerButton, SButton } from './styles'

export default function Status({ data }: { data: StatusProps[] }) {
  const { width } = useDimension()

  // const mobileSettings: SwiperProps = {
  //   spaceBetween: 20,
  //   slidesPerView: 1.2,
  //   pagination: {
  //     type: 'progressbar',
  //   },
  //   modules: [Pagination],
  // }

  const settings: SwiperProps = {
    spaceBetween: width >= 500 ? 30 : 20,
    slidesPerView: width >= 500 ? 2 : 1.2,
    pagination: {
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-prev',
    },
    modules: [Pagination, Navigation],
  }

  return (
    <Swiper {...settings}>
      {data.map(d => (
        <SwiperSlide key={d.title}>
          <Card {...d} />
        </SwiperSlide>
      ))}
      <SContainerButton>
        <SButton title="Previous" className="swiper-prev ">
          <MdChevronLeft size={40} />
        </SButton>
        <SButton title="Next" className="swiper-next">
          <MdChevronRight size={40} />
        </SButton>
      </SContainerButton>
    </Swiper>
  )
}
