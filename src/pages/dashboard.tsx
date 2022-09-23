import type { NextPage } from 'next'
import Dashboard from '../components/Dashboard'
import Filter from '../components/Filter'

import axios from 'axios'

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

const Dash: NextPage = () => {
  const test = async () => {
    // const res = await axios.get<MovieDbProps>('/api/tmdb/tv/name/breaking')
    // res.data.results.map(tv => console.log(tv.name))
  }

  test()

  return (
    <>
      <Filter />
      <Dashboard />
    </>
  )
}

export default Dash
