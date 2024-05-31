# ⚡Poster

Quick simple backend for testing frontend interviewing candidates. An API server to make posts!

# 🔥Tech stack

- Fastify
- @neato/config
- Prisma

# 🧬Development

Create an `.env` file at `/.env` with these contents:
```sh
PST_DB__FILE_PATH_URL=file:./dev.db
```

Then finally, spin up the dev server:
```sh
pnpm i
pnpm dev
```

> [!TIP]
> You must be running **NodeJS 20** and use `pnpm` for the package manager.

# 🥔Command cheatsheet

- `npx prisma migrate dev` - run migrations or create one
- `npx prisma migrate deploy` - run migrations for production
- `npx prisma migrate reset` - reset database with seeding
- `pnpm dev` - run the development server
