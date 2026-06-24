import { NextResponse } from "next/server";

import { corsHeaders } from "@/lib/cors";
import { exchangeHandoffCode } from "@/lib/handoff-code";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");

  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  if (!origin || Object.keys(headers).length === 0) {
    return NextResponse.json({ error: "Origin not allowed." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400, headers },
    );
  }

  const code =
    typeof body === "object" &&
    body !== null &&
    "code" in body &&
    typeof body.code === "string"
      ? body.code
      : null;

  if (!code) {
    return NextResponse.json(
      { error: "Missing handoff code." },
      { status: 400, headers },
    );
  }

  const secret = requiredEnv("AUTH_SECRET");
  const accessToken = await exchangeHandoffCode(code, secret);

  if (!accessToken) {
    return NextResponse.json(
      { error: "Invalid or expired handoff code." },
      { status: 400, headers },
    );
  }

  return NextResponse.json({ access_token: accessToken }, { headers });
}
