import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'

export default async function createTV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  // If not session
  if (!session) {
    // return res.status(401).send('Unauthorized')
  }

  // const userId = session.user.id
  const userId = process.env.USER_ID
  const { tvApiId, title, genre, status, season, episode, poster } = req.body

  // If is not number
  !Number(tvApiId) &&
    res.status(400).json({ message: 'tvApiId must be number' })
  !Number(season) && res.status(400).json({ message: 'season must be number' })
  !Number(episode) &&
    res.status(400).json({ message: 'episode must be number' })

  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

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
