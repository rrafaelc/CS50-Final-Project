import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Navigation, Pagination } from 'swiper'
import Card from 'components/Card'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { useDimension } from 'context/dimensionContext'

import { StatusProps } from 'types'

import { SContainerButton, SButton } from './styles'
import colors from 'styles/colors'

interface Props {
  data: StatusProps[]
  addOneSeason: (id: string) => Promise<void>
  addOneEpisode: (id: string) => Promise<void>
  deletedMedia: (id: string) => void
}

export default function Status({
  data,
  addOneSeason,
  addOneEpisode,
  deletedMedia,
}: Props) {
  const { width } = useDimension()

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

  const sortedByDateDesc = data.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <Swiper {...settings}>
      {sortedByDateDesc.map(elem => (
        <SwiperSlide key={elem.id}>
          <Card
            props={elem}
            addOneSeason={addOneSeason}
            addOneEpisode={addOneEpisode}
            deletedMedia={deletedMedia}
          />
        </SwiperSlide>
      ))}
      <SContainerButton>
        <SButton title="Previous" className="swiper-prev ">
          <MdChevronLeft size={40} color={colors.white} />
        </SButton>
        <SButton title="Next" className="swiper-next">
          <MdChevronRight size={40} color={colors.white} />
        </SButton>
      </SContainerButton>
    </Swiper>
  )
}
