import type { NextApiRequest, NextApiResponse } from 'next'
import { MovieDb } from 'moviedb-promise'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY ?? '')
  const query = String(req.query.query)
  const page = Number(req.query.page ?? 1)

  // const tv = await moviedb.searchTv({
  //   query,
  // })
  // const movieGenre = await moviedb.genreMovieList()
  // const tvGenre = await moviedb.genreTvList()
  const multi = await moviedb.searchMulti({ query, page })

  // const tvInfo = await moviedb.tvInfo({ id: 1396 })
  // const movieInfo = await moviedb.movieInfo({ id: 1396 })

  return res.json(multi)
}
