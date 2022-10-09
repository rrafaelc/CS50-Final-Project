import type { GetStaticProps, NextPage } from 'next'
import axios from 'services/axios'

import Login from 'components/Login'
import CookieConsent from 'components/CookieConsent'

const path_to_delete = process.env.PATH_TO_DELETE_ACCCOUNTS

export const getStaticProps: GetStaticProps = async () => {
  // This project is just an example, I don't need the data for the users for too long
  // So every account that was created 10 days or more will be deleted
  // And revalidate this page every 5 days in order to check
  try {
    path_to_delete && (await axios.delete(path_to_delete))
  } catch {}

  return {
    props: {},
    revalidate: 60 * 60 * 24 * 5, // 5 days
  }
}

const LoginPage: NextPage = () => {
  return (
    <>
      <CookieConsent />
      <Login />
    </>
  )
}

export default LoginPage
