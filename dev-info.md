# Development Information

- [Smart Hire](https://smart-hire.paravartech.com/)

## 3rd party services/dependencies

1. Vector DB - [Qdrant](https://cloud.qdrant.io/)
2. Postgres DB - [nHost](https://app.nhost.io/)
3. Supabase for Auth - [https://supabase.com/]
4. Vercel for deployment (server & clinet) - [Vercel](https://vercel.com/)
5. Domain name from Squarespace - [Square Space](https://account.squarespace.com/)

## App to wok in production

Currently our app in running on free tier mostly

- so freequnetly, our app is going to sleep mode if it inactive for a specific time
- so if it not working please wake up from sleeping state
  - especially
    - supabase, nHost, Qdrant
