import { NextResponse, type NextRequest } from "next/server";
import { validateReturnTo } from "@/lib/return-to";

const RETURN_TO_COOKIE = "kvshvl_return_to";

export function GET(request: NextRequest) {
  const returnToRaw = new URL(request.url).searchParams.get("return_to");
  const validated = validateReturnTo(returnToRaw);

  if (!validated.ok) {
    return NextResponse.json(
      { error: validated.reason },
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const response = NextResponse.redirect(new URL("/sign-in/ui", request.url));
  response.cookies.set(RETURN_TO_COOKIE, validated.returnTo.toString(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 10 * 60,
  });
  return response;
}

