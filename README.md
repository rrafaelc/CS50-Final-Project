![Logo of the project](https://raw.githubusercontent.com/rrafaelc/CS50-Final-Project/main/public/logo.svg)

# [CS50 Final Project | TV & Movie Tracker](https://cs50-fp.vercel.app)

This is a project where you can track TV shows and movies, to remember which episode did you stop at, if you have already completed a movie or TV, is watching, is on hold, is dropped or plan to watch it

## Environment Variables

- Create a file called `.env.local` and type this variables

- DATABASE_URL - `postgresql://postgres:password@localhost:5432/mydb`

- NEXTAUTH_URL - `http://localhost:3000`

- NEXTAUTH_SECRET - `secret`

- MOVIEDB_API_KEY - Get an api key [here](https://www.themoviedb.org/documentation/api)

`Optional`

- PATH_TO_DELETE_ACCCOUNTS - `http://localhost:3333/api/delete_accounts`

Install dependencies:

```bash
yarn
```

Using prisma CLI:

Just for using prisma CLI, the `DATABASE_URL` needs to be in `.env` file, when done you can remove

```bash
npx prisma generate

# For local database development
npx prisma migrate dev

# For online database production
npx prisma db push
```

Start server:

```bash
yarn dev
# Or
yarn build && yarn start
```

## How to use

[![CS50 Final Project](https://img.youtube.com/vi/BlPotl8ULyg/0.jpg)](https://www.youtube.com/watch?v=BlPotl8ULyg 'CS50 Final Project - Youtube')

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

[MIT](https://choosealicense.com/licenses/mit/)
