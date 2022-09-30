import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '@api/auth/[...nextauth]'

export default async function deleteTvOrMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).send('Unauthorized')
  }

  if (req.method !== 'DELETE') {
    return res.status(405).send(`Method ${req.method} not allowed`)
  }

  const id = String(req.query.id)

  try {
    try {
      await prisma.tvShow.delete({
        where: {
          id,
        },
      })
    } catch {}

    try {
      await prisma.movie.delete({
        where: {
          id,
        },
      })
    } catch {}

    return res.send('resource deleted successfully')
  } catch (err: any) {
    console.log(err.message)
    return res.status(404).send('ID not found')
  }
}
