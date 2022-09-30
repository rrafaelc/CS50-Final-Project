import type { GetServerSideProps, NextPage } from 'next'

import Edit from 'components/Edit'

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query

  if (!id) {
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

const Editpage: NextPage = () => {
  return <Edit />
}

export default Editpage
