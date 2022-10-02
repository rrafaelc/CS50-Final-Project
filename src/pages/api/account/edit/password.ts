import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'
import bcrypt from 'bcrypt'

export default async function editPassword(
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

  const { password, newPassword } = req.body

  if (!password || !newPassword) {
    return res.status(400).send("'password' or 'newPassword' missing")
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (user) {
      // Check the password
      const compare = await bcrypt.compare(password, user.hash)

      if (!compare) {
        return res.status(400).send('Incorrect password')
      }
    }
  } catch (err) {
    console.log(err)

    return res.status(500).send('An error occurred while get current user')
  }

  // If passed all conditions hash new password and update
  bcrypt
    .hash(newPassword, 10)
    .then(async hash => {
      try {
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            hash,
          },
        })
      } catch (err) {
        console.log(err)

        return res.status(500).send('An error occurred while changing password')
      }
    })
    .catch(err => {
      console.log(err)

      return res.status(500).send('An error occurred while hashing password')
    })

  return res.send('resource updated successfully')
}
