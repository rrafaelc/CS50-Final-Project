import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function createTVorMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'POST') {
    return res.status(405).send(`Method ${req.method} not allowed`)
  }

  const userId = session.user.id

  const { apiId, mediaType, title, status, season, episode, poster } = req.body

  // If is not number
  !Number(apiId) && res.status(400).send('apiId must be number')

  if (mediaType === 'tv') {
    !Number(season) && res.status(400).send('season must be number')
    !Number(episode) && res.status(400).send('episode must be number')

    const tvApiId = apiId
    // Check if tv show exists
    const tv = await prisma.tvShow.findFirst({
      where: {
        userId,
        tvApiId,
      },
    })

    // If found return
    if (tv) {
      return res.status(400).send('Can not create, tv show already exists.')
    }

    // Else create
    await prisma.tvShow.create({
      data: {
        userId,
        tvApiId,
        title,

        status,
        season,
        episode,
        poster,
        type: mediaType,
      },
    })

    return res.status(201).send('resource created successfully')
  }

  if (mediaType === 'movie') {
    const movieApiId = apiId

    // Check if tv show exists
    const movie = await prisma.movie.findFirst({
      where: {
        userId,
        movieApiId,
      },
    })

    // If found return
    if (movie) {
      return res.status(400).send('Can not create, movie already exists.')
    }

    // Else create
    await prisma.movie.create({
      data: {
        userId,
        movieApiId,
        title,
        status,
        poster,
        type: mediaType,
      },
    })

    return res.status(201).send('resource created successfully')
  }

  return res.status(400).send('mediaType must be "tv" or "movie"')
}
