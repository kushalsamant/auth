import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    authSecretLen: process.env.AUTH_SECRET?.length ?? 0,
    googleIdLen: process.env.AUTH_GOOGLE_ID?.length ?? 0,
    googleSecretLen: process.env.AUTH_GOOGLE_SECRET?.length ?? 0,
    authUrl: process.env.AUTH_URL ?? null,
    trustHost: process.env.AUTH_TRUST_HOST ?? null,
  });
}
