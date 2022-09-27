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

  const data: any = []

  const tv = await prisma.tvShow.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const movie = await prisma.movie.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  tv.forEach(elem => {
    elem.poster = `https://image.tmdb.org/t/p/w220_and_h330_face${elem.poster}`
    return data.push(elem)
  })
  movie.forEach(elem => {
    elem.poster = `https://image.tmdb.org/t/p/w220_and_h330_face${elem.poster}`
    return data.push(elem)
  })

  return res.status(200).json(data)
}
