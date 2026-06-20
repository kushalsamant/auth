import { SignJWT } from "jose";

export type PlatformJwtClaims = {
  email: string;
  sub: string;
  name?: string | null;
};

export async function issuePlatformJwt(
  claims: PlatformJwtClaims,
  options: {
    secret: string;
    issuer: string;
    audience: string;
    expiresInSeconds: number;
  },
): Promise<string> {
  const key = new TextEncoder().encode(options.secret);

  return await new SignJWT({
    email: claims.email,
    sub: claims.sub,
    name: claims.name ?? undefined,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(options.issuer)
    .setAudience(options.audience)
    .setExpirationTime(Math.floor(Date.now() / 1000) + options.expiresInSeconds)
    .sign(key);
}

