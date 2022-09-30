import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'

export default async function updateMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'PUT') {
    return res.status(405).send(`Method ${req.method} not allowed`)
  }

  const statusConditions = ['watching', 'completed', 'onhold', 'dropped', 'ptw']
  const { status } = req.body

  if (!statusConditions.some(el => String(status).includes(el))) {
    return res.status(400).send('Invalid status')
  }

  const id = String(req.query.id)

  // Check if the current user has this movieId
  const userhasMovieId = await prisma.movie.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!userhasMovieId) {
    return res.status(400).send('Movie not found')
  }

  try {
    await prisma.movie.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    return res.send('resource updated successfully')
  } catch (err: any) {
    console.log(err.message)

    return res.status(500).send('Database error')
  }
}
