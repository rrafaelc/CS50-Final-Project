import type { NextApiRequest, NextApiResponse } from 'next'

import { MovieDb, TvResultsResponse } from 'moviedb-promise'

export default async function tvShow(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY ?? '')
  const tv = await moviedb.searchTv({
    query: 'Breaking',
  })

  return res.json(tv)
}
