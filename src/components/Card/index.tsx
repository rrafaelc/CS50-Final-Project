import Image from 'next/image'
import { MdAddCircleOutline, MdEdit } from 'react-icons/md'
import padNumber from 'utils/padNumber'
import colors from 'styles/colors'
import { StatusProps } from 'types'
import parseDate from 'utils/parseDate'

import { useDimension } from 'context/dimensionContext'
import { useModalStatus } from 'context/modalStatusContext'

import { SContainer, SImage, SInfo, SStatus } from './styles'

interface CardProps {
  props: StatusProps
  addOneSeason: (id: string) => Promise<void>
  addOneEpisode: (id: string) => Promise<void>
}

export default function Card({
  props,
  addOneSeason,
  addOneEpisode,
}: CardProps) {
  const { width } = useDimension()
  const { toggle, setItemProps, setStatusFunction } = useModalStatus()
  const { year, month, day } = parseDate(props.updatedAt)

  const statusName = () => {
    switch (props.status) {
      case 'watching':
        return 'Watching'

      case 'completed':
        return 'Completed'

      case 'onhold':
        return 'On hold'

      case 'dropped':
        return 'Dropped'

      case 'ptw':
        return 'Plan to watch'
      default:
        return 'Watching'
    }
  }

  const handleEditCardProps = (
    id: string,
    name: string,
    poster: string,
    type: string,
    status: string,
    season?: number,
    episode?: number
  ) => {
    setStatusFunction(status)
    setItemProps({ id, name, poster, type, season, episode })
    toggle()
  }

  return (
    <SContainer>
      <SImage>
        <Image src={props.poster} layout="fill" alt={props.title} />
      </SImage>

      <SInfo isMovie={props.type === 'movie'}>
        <MdEdit className="edit" size={width >= 500 ? 35 : 24} />
        <h1>{props.title}</h1>

        <div className="middle">
          {props.type === 'tv' && (
            <div className="episodes">
              <p>
                {width >= 500 ? 'Season ' : 'S '}
                <span>{padNumber(2, props.season)}</span>
              </p>
              <p>
                {width >= 500 ? 'Episode ' : 'Ep '}
                <span>{padNumber(2, props.episode)}</span>
              </p>
            </div>
          )}

          <SStatus
            onClick={() =>
              handleEditCardProps(
                props.id,
                props.title,
                props.poster,
                props.type,
                props.status,
                props.season,
                props.episode
              )
            }
            status={props.status}
          >
            {statusName()}
          </SStatus>

          <div className="lastUpdate">
            Last Update - {padNumber(2, month)}/{padNumber(2, day)}/
            {padNumber(2, year).substring(2)}
          </div>
        </div>

        {props.type === 'tv' && (
          <div className="buttons">
            <button
              className="button"
              onClick={async () => await addOneSeason(props.id)}
            >
              Season{' '}
              <MdAddCircleOutline
                size={width >= 500 ? 24 : 12}
                color={colors.black}
              />
            </button>
            <button
              className="button"
              onClick={async () => await addOneEpisode(props.id)}
            >
              Episode{' '}
              <MdAddCircleOutline
                size={width >= 500 ? 24 : 12}
                color={colors.black}
              />
            </button>
          </div>
        )}
      </SInfo>
    </SContainer>
  )
}
