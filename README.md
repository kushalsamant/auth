# auth

Unified KVSHVL sign-in service for `auth.kvshvl.in`.

Google OAuth via Auth.js (NextAuth v5). Issues platform JWTs for KVSHVL apps (e.g. Check Your Drawings).

## Deploy

Production: Vercel project `kvshvl/kvshvl-auth` → https://auth.kvshvl.in

Required env vars:

| Var | Purpose |
|-----|---------|
| `AUTH_URL` | Canonical issuer URL; also used as the platform JWT `iss` claim (`src/app/handoff/page.tsx`). |
| `AUTH_SECRET` | NextAuth session secret; also signs the platform JWT (HS256, `src/lib/platform-jwt.ts`). |
| `AUTH_GOOGLE_ID` | Google OAuth client id (read by Auth.js `Google` provider). |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret (read by Auth.js `Google` provider). |

Optional:

| Var | Purpose |
|-----|---------|
| `AUTH_PLATFORM_JWT_TTL_SECONDS` | Platform JWT lifetime in seconds (default `7200` = 2h). Lower = smaller window if a token is stolen. |

`trustHost` is enabled directly in `src/auth.ts`, so `AUTH_TRUST_HOST` is not required.

## Local dev

```bash
npm install
npm run dev
```

Copy env from Vercel: `vercel env pull .env.local`
