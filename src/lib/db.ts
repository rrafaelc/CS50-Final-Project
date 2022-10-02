import { AxiosError } from 'axios'
import axios from 'services/axios'

// S: State, T: Type, K: Key, V: Value, E: Element
// https://youtu.be/Zjs7IJuhdaM

interface RegisterAccountProps {
  name: string
  password: string
}

type EditUsernameProps = RegisterAccountProps

interface EditPasswordProps {
  password: string
  newPassword: string
}

interface CreateTVorMovieProps {
  apiId: number
  mediaType: string
  title: string
  status: string
  season?: number
  episode?: number
  poster: string
}

interface UpdateTvProps {
  id: string
  status: string
  season: number
  episode: number
}

interface UpdateMovieProps {
  id: string
  status: string
}

export const registerAccount = async ({
  name,
  password,
}: RegisterAccountProps) => {
  try {
    await axios.post('/api/account/register', {
      name,
      password,
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const editUsername = async ({ name, password }: EditUsernameProps) => {
  try {
    await axios.put('/api/account/edit/username', {
      name,
      password,
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const editPassword = async ({
  password,
  newPassword,
}: EditPasswordProps) => {
  try {
    await axios.put('/api/account/edit/password', {
      password,
      newPassword,
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const getAll = async <T = any>(): Promise<T> => {
  try {
    const res = await axios.get<T>('/api/list')

    return res.data
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const getOne = async <T = any>(id: string): Promise<T> => {
  try {
    const res = await axios.get<T>(`/api/list/${id}`)

    return res.data
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const createTVorMovie = async ({
  apiId,
  mediaType,
  title,
  status,
  season,
  episode,
  poster,
}: CreateTVorMovieProps) => {
  try {
    await axios.post('/api/create', {
      apiId,
      mediaType,
      title,
      status,
      season,
      episode,
      poster,
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const updateTV = async ({
  id,
  status,
  season,
  episode,
}: UpdateTvProps) => {
  try {
    await axios.put(`/api/tv/update/${id}`, {
      status,
      season,
      episode,
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const updateMovie = async ({ id, status }: UpdateMovieProps) => {
  try {
    await axios.put(`/api/movie/update/${id}`, {
      status,
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const deleteMedia = async (id: string) => {
  try {
    await axios.delete(`/api/delete/${id}`)
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}

export const deleteAccount = async (password: string) => {
  try {
    await axios.delete('/api/account/delete', {
      data: {
        password,
      },
    })
  } catch (err) {
    const error = err as AxiosError

    throw new AxiosError(
      error.message,
      error.code,
      error.config,
      error.request,
      error.response
    )
  }
}
