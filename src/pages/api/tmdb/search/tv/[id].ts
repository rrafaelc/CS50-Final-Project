import type { NextApiRequest, NextApiResponse } from 'next'
import { MovieDb } from 'moviedb-promise'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@api/auth/[...nextauth]'

export default async function searchByIdTv(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'GET') {
    return res.status(405).send(`Method ${req.method} not allowed`)
  }

  const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY ?? '')
  const id = String(req.query.id)

  try {
    const tvInfo = await moviedb.tvInfo({ id })
    return res.json(tvInfo)
  } catch (err: any) {
    console.log(err.message)

    return res.status(400).send('ID not found')
  }
}
