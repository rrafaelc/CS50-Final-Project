const env = process.env.NODE_ENV

const appURL =
  env === 'development' ? process.env.NEXTAUTH_URL : process.env.VERCEL_URL

export { appURL }
