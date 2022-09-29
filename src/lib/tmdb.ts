import { AxiosError } from 'axios'
import axios from 'services/axios'

interface SearchMultiProps {
  query: string
  page: number
}

export const searchMulti = async ({ query, page }: SearchMultiProps) => {
  try {
    const res = await axios.get('/api/tmdb/search/', {
      params: {
        query,
        page,
      },
    })

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

export const searchTV = async (id: string) => {
  try {
    const res = await axios.get(`/api/tmdb/search/tv/${id}`)

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

export const searchMovie = async (id: string) => {
  try {
    const res = await axios.get(`/api/tmdb/search/movie/${id}`)

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
