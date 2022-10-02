import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { prisma } from 'lib/prisma'
import bcrypt from 'bcrypt'

export default async function editUsername(
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

  const { name, password } = req.body

  if (!name || !password) {
    return res.status(400).send("'name' or 'password' missing")
  }

  // First character must be alphabetic
  if (!/^[a-zA-Z].*/.test(name)) {
    return res.status(400).send('First character must be alphabetic')
  }

  // Only alphanumeric is allowed
  if (!/^[a-zA-Z0-9_]*$/.test(name)) {
    return res.status(400).send('Only alphanumeric and underscore is allowed')
  }

  try {
    const hasUser = await prisma.user.findFirst({
      where: {
        name: String(name).toLowerCase(),
      },
    })

    if (hasUser) {
      return res.status(403).send('User name already exists')
    }
  } catch (err) {
    console.log(err)

    return res
      .status(500)
      .send('An error occurred while searching for user name')
  }

  try {
    // Search for user
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

    return res
      .status(500)
      .send('An error occurred while searching for current user')
  }

  // If passed all conditions change username
  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: String(name).toLowerCase(),
      },
    })
  } catch (err) {
    console.log(err)

    return res.status(500).send('An error occurred while changing user name')
  }

  return res.send('resource updated successfully')
}
