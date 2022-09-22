import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

import Register from '../components/Register'

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Reg: NextPage = () => {
  return <Register />
}

export default Reg
