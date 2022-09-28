import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'

export default async function createTV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  const { status, season, episode } = req.body
  const id = String(req.query.id)

  // If is not number
  !Number(season) && res.status(400).json({ message: 'season must be number' })
  !Number(episode) &&
    res.status(400).json({ message: 'episode must be number' })

  // Check if the current user has this tvId
  const userhasTvId = await prisma.tvShow.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!userhasTvId) {
    return res.status(400).send('Tv Show not found')
  }

  try {
    await prisma.tvShow.update({
      where: {
        id,
      },
      data: {
        season,
        episode,
        status,
      },
    })

    return res.status(204).send({})
  } catch (err: any) {
    console.log(err)

    return res.status(500).send('Database error')
  }
}
