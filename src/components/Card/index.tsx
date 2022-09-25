import Image from 'next/image'
import { MdAddCircleOutline, MdEdit } from 'react-icons/md'
import padNumber from 'utils/padNumber'
import colors from 'styles/colors'
import { StatusProps } from 'types'
import parseDate from 'utils/parseDate'

import { useDimension } from 'context/dimensionContext'

import { SContainer, SImage, SInfo, SStatus } from './styles'

type CardProps = StatusProps

export default function Card(props: CardProps) {
  const { width } = useDimension()
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

          <SStatus status={props.status}>{statusName()}</SStatus>

          <div className="lastUpdate">
            Last Update - {padNumber(2, month)}/{padNumber(2, day)}/
            {padNumber(2, year).substring(2)}
          </div>
        </div>

        {props.type === 'tv' && (
          <div className="buttons">
            <button className="button">
              Season{' '}
              <MdAddCircleOutline
                size={width >= 500 ? 24 : 12}
                color={colors.black}
              />
            </button>
            <button className="button">
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
