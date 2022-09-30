import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'GET') {
    return res.status(405).send(`Method ${req.method} not allowed`)
  }

  const id = String(req.query.id)

  const tv = await prisma.tvShow.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (tv) {
    return res.json(tv)
  }

  const movie = await prisma.movie.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (movie) {
    return res.json(movie)
  }

  return res.status(400).send('ID not found')
}
