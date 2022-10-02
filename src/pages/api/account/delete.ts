import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'
import bcrypt from 'bcrypt'

export default async function deleteAccount(
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

  const { password } = req.body

  if (!password) {
    return res.status(400).send("'password' missing")
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

  // If all passed delete account
  try {
    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    })
  } catch (err) {
    console.log(err)

    return res.status(500).send('An error occurred while deleting account')
  }

  return res.send('account deleted successfully')
}
