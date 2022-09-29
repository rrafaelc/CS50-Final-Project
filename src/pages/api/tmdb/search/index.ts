import type { NextApiRequest, NextApiResponse } from 'next'
import { MovieDb } from 'moviedb-promise'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@api/auth/[...nextauth]'

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY ?? '')
  if (!req.query.query) {
    return res
      .status(400)
      .send('Missing query. Example: api/tmdb/search?query=The Simpsons')
  }

  const query = String(req.query.query)
  const page = Number(req.query.page ?? 1)

  const multi = await moviedb.searchMulti({ query, page })

  return res.json(multi)
}
