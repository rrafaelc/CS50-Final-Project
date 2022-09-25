import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'

export default async function listAll(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  const tv = await prisma.tvShow.findMany({
    where: {
      userId: session.user.id,
      // userId: process.env.USER_ID,
    },
  })
  const movie = await prisma.movie.findMany({
    where: {
      userId: session.user.id,
      // userId: process.env.USER_ID,
    },
  })

  return res.status(200).json({ tv, movie })
}
