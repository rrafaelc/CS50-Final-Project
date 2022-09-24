import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'

export default async function createTV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, tvId, title, genre, status, season, episode } = req.body

  // If is not number
  !Number(tvId) && res.status(400).json({ message: 'tvID must be number' })
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
      tvId,
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
      tvId,
      title,
      genre,
      status,
      season,
      episode,
    },
  })

  return res.status(201).send({})
}
