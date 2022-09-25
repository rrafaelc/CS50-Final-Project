import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function createTV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    // return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  // const userId = session.user.id
  const userId = process.env.USER_ID
  const { apiId, mediaType, title, genre, status, season, episode, poster } =
    req.body

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
        genre,
        status,
        season,
        episode,
        poster,
      },
    })

    return res.status(201).send({})
  }

  // TODO
  if (mediaType === 'movie') {
    const tvApiId = apiId
    return res.status(400).send('Can not create, movie already exists.')
    // Check if tv show exists
    const tv = await prisma.tvShow.findFirst({
      where: {
        userId,
        tvApiId,
      },
    })

    // If found return
    if (tv) {
      return res.status(400).send('Can not create, movie already exists.')
    }

    // Else create
    await prisma.tvShow.create({
      data: {
        userId,
        tvApiId,
        title,
        genre,
        status,
        season,
        episode,
        poster,
      },
    })

    return res.status(201).send({})
  }

  return res.status(400).send('mediaType must be "tv" or "movie"')
}
