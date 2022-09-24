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

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  // Check if tv show exists
  const tv = await prisma.tvShow.findFirst({
    where: {
      userId,
      tvId,
    },
  })

  // If found update
  if (tv) {
    await prisma.tvShow.update({
      where: {
        id: tv.id,
      },
      data: {
        season,
        episode,
        status,
      },
    })

    return res.status(204).send({})
  }

  return res.status(400).send('Tv Show not found')
}
