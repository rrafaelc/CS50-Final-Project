import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'lib/prisma'
import bcrypt from 'bcrypt'

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Error')
  }

  const { name, password } = req.body

  // First character must be alphabetic
  if (!/^[a-zA-Z].*/.test(name)) {
    return res.status(400).send('First character must be alphabetic')
  }

  // Only alphanumeric is allowed
  if (!/^[a-zA-Z0-9_]*$/.test(name)) {
    return res.status(400).send('Only alphanumeric and underscore is allowed')
  }

  if (String(password).length < 3) {
    return res.status(400).send('Password must be at least 3 characters long')
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    })

    if (user) {
      return res.status(403).send('User name already taken')
    }
  } catch (err: any) {
    console.log(err.message)
    return res.status(500).send('Database error: Error searching for username')
  }

  try {
    // Hash the password
    const hash = await bcrypt.hash(password, 10)

    try {
      // Create the new user
      await prisma.user.create({
        data: {
          name: String(name).toLowerCase(),
          hash,
        },
      })
    } catch (err: any) {
      console.log(err.message)
      return res.status(500).send('Database error: Error creating new user')
    }
  } catch (err: any) {
    console.log(err.message)
    return res.status(500).send('Error while hashing password')
  }

  return res.status(201).send('resource created successfully')
}
