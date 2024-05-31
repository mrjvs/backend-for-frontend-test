# ⚡Poster

Quick simple backend for testing frontend interviewing candidates. An API server to make posts!

# 🔥Tech stack

- Fastify
- @neato/config
- Prisma

# 🧬Development

Instructions on how to run for development are not yet ready.
Create an `.env` file at `/.env` with these contents:
```sh
PST_USE_PRESETS=docker
PST_DB__CONNECTION=postgres://postgres:postgres@localhost:5432/postgres
```

Then run the compose file at `/.docker/dev` with this command to setup the complimentary services:
```sh
docker compose up -d
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
