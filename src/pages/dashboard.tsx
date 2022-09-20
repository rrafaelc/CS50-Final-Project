import type { NextPage } from 'next'
import Dashboard from '../components/Dashboard'
import Filter from '../components/Filter'

const Dash: NextPage = () => {
  return (
    <>
      <Filter />
      <Dashboard />
    </>
  )
}

export default Dash
