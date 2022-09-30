import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Login from 'components/Login'

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

const LoginPage: NextPage = () => {
  return <Login />
}

export default LoginPage
