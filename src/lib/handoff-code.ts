import { SignJWT, jwtVerify } from "jose";

const HANDOFF_CODE_TTL_SECONDS = 60;

type HandoffCodePayload = {
  pt: string;
};

export async function createHandoffCode(
  platformJwt: string,
  secret: string,
): Promise<string> {
  const key = new TextEncoder().encode(secret);

  return new SignJWT({ pt: platformJwt } satisfies HandoffCodePayload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + HANDOFF_CODE_TTL_SECONDS)
    .setJti(crypto.randomUUID())
    .sign(key);
}

export async function exchangeHandoffCode(
  code: string,
  secret: string,
): Promise<string | null> {
  const key = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify(code, key, {
      algorithms: ["HS256"],
    });

    const platformJwt = payload.pt;
    return typeof platformJwt === "string" ? platformJwt : null;
  } catch {
    return null;
  }
}
