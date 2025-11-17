# Smart Hire

Ai recruiter - makes recruiting simple

## Usage on local server

1. Server setup
   1. run postgres db & qdrant db on local or use any cloud providers
   2. pass postgres, qdrant credentials in server/.env
   3. pass two llm api keys in server/.env
   4. seed optional `pnpm run seed`
   5. run `pnpm run dev`

2. Clinet setup
   1. pnpm i
   2. pnpm run dev
