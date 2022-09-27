import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from 'next'
import Add from 'components/Add'

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context

  // If is not number
  if (!Number(query.id) || !query.type) {
    return {
      redirect: {
        destination: '/search',
        permanent: false,
      },
    }
  }

  if (query.type === 'tv' || query.type === 'movie') {
    return {
      props: {},
    }
  }

  return {
    redirect: {
      destination: '/search',
      permanent: false,
    },
  }
}

const Addpage: NextPage = () => {
  return <Add />
}

export default Addpage
