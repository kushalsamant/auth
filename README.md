# auth

Unified KVSHVL sign-in service for `auth.kvshvl.in`.

Google OAuth via Auth.js (NextAuth v5). Issues platform JWTs for KVSHVL apps (e.g. Check Your Drawings).

## Deploy

Production: Vercel project `kvshvl/kvshvl-auth` → https://auth.kvshvl.in

Required env vars: `AUTH_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`

## Local dev

```bash
npm install
npm run dev
```

Copy env from Vercel: `vercel env pull .env.local`
