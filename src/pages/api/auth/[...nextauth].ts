import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../lib/prisma'

interface CredentialProps {
  name: string
  password: string
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { name, password } = credentials as CredentialProps

        // First character must be alphabetic
        if (!/^[a-zA-Z].*/.test(name)) {
          return null
        }

        // Only alphanumeric is allowed
        if (!/^[a-zA-Z0-9_]*$/.test(name)) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            name,
          },
        })

        if (user) {
          if (user.password === password) {
            return {
              id: user.id,
              name: user.name,
            }
          }
        }

        // If data is incorrect
        return null
      },
    }),
  ],
  callbacks: {
    // This types are coming from types folder
    // https://next-auth.js.org/getting-started/typescript#module-augmentation
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
      },
    }),
  },
}

export default NextAuth(authOptions)
