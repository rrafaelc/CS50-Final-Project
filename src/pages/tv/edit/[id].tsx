import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next'

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

const Addpage: NextPage = () => {
  return <Edit />
}

export default Addpage
