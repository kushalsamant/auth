# platform-auth

Unified KVSHVL sign-in service for `auth.kvshvl.in`.

Google OAuth via Auth.js (NextAuth v5). Issues platform JWTs for KVSHVL apps (e.g. Check Your Drawings).

## Deploy

Production: Vercel project `kvshvl/platform-auth` → https://auth.kvshvl.in

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
| `AUTH_RETURN_TO_ALLOWLIST` | Comma-separated allowed `return_to` origins (e.g. `https://checkyourdrawings.kvshvl.in`). When unset, any `https://*.kvshvl.in` subdomain is allowed. |

`trustHost` is enabled directly in `src/auth.ts`, so `AUTH_TRUST_HOST` is not required.

Copy [`.env.example`](.env.example) for local placeholders.

## Local dev

```bash
npm install
npm run dev
```

Copy env from Vercel: `vercel env pull .env.local`

**Sign-in testing:** use production auth at `https://auth.kvshvl.in` with a real `https://*.kvshvl.in` `return_to` (e.g. `https://checkyourdrawings.kvshvl.in/auth/callback`). Local `npm run dev` does not support end-to-end sign-in on `localhost` because `return_to` must be HTTPS under `*.kvshvl.in` and the return_to cookie is `secure`.

Handoff flow: after Google OAuth, `/handoff` redirects to the app with a short-lived `handoff_code` query param. The app exchanges it via `POST /api/handoff/exchange` for the platform JWT.

## CI

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

GitHub Actions runs the same checks on push/PR to `main`.
