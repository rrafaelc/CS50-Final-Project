import type { NextPage } from 'next'
import Dashboard from 'components/Dashboard'

import axios from 'lib/axios'

interface MovieDbProps {
  page: number
  results: {
    id: number
    name: string
    poster_path: string
  }[]
  total_pages: number
  total_results: number
}

const test = async () => {
  const res = await axios.get<MovieDbProps>('/api/tmdb/tv/name/breaking bad')
  console.log(res.data)
  // res.data.results.map(tv => console.log(tv))
}

const Dash: NextPage = () => {
  return <Dashboard />
}

export default Dash
