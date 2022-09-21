import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface CredentialProps {
  name: string
  password: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 1, // 1 day
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { name, password } = credentials as CredentialProps
        // Temp
        if (name === 'rafael' && password === '123') {
          return {
            id: '123',
            name: 'Rafael Costa',
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
  // secret: process.env.NEXTAUTH_SECRET ?? 'temp',
}

export default NextAuth(authOptions)
