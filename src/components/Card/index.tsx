import Image from 'next/image'
import { MdAddCircleOutline, MdEdit, MdDeleteForever } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import padNumber from 'utils/padNumber'
import { StatusProps } from 'types'
import parseDate from 'utils/parseDate'
import { deleteMedia } from 'lib/db'

import { useDimension } from 'context/dimensionContext'
import { useModalStatus } from 'context/modalStatusContext'

import colors from 'styles/colors'
import { SContainer, SImage, SInfo, SStatus } from './styles'

interface CardProps {
  props: StatusProps
  addOneSeason: (id: string) => Promise<void>
  addOneEpisode: (id: string) => Promise<void>
  deletedMedia: (id: string) => void
}

export default function Card({
  props,
  addOneSeason,
  addOneEpisode,
  deletedMedia,
}: CardProps) {
  const router = useRouter()
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

  const handleDelete = async (id: string) => {
    // If false
    if (!confirm('Are you sure you want to delete?')) return

    try {
      await deleteMedia(id)

      deletedMedia(id)
    } catch (err: any) {
      console.log(err.message)

      toast.error('An error occurred when deleting')
      return
    }

    router.push('/dashboard')
  }

  return (
    <SContainer>
      <SImage>
  <Image src={props.poster} fill alt={props.title} />
      </SImage>

      <SInfo isMovie={props.type === 'movie'}>
        {props.type === 'tv' ? (
          <MdEdit
            className="icon"
            size={width >= 500 ? 35 : 24}
            onClick={() => router.push(`/tv/edit/${props.id}`)}
          />
        ) : (
          <MdDeleteForever
            className="icon delete"
            size={width >= 500 ? 35 : 24}
            onClick={() => handleDelete(props.id)}
          />
        )}
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
