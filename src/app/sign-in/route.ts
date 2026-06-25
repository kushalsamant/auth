import { NextResponse, type NextRequest } from "next/server";
import {
  RETURN_TO_COOKIE,
  RETURN_TO_COOKIE_MAX_AGE_SECONDS,
} from "@/lib/constants";
import { validateReturnTo } from "@/lib/return-to";

export function GET(request: NextRequest) {
  const returnToRaw = new URL(request.url).searchParams.get("return_to");
  const validated = validateReturnTo(returnToRaw);

  if (!validated.ok) {
    const errorUrl = new URL("/sign-in/error", request.url);
    errorUrl.searchParams.set("reason", validated.reason);
    return NextResponse.redirect(errorUrl);
  }

  const response = NextResponse.redirect(new URL("/sign-in/ui", request.url));
  response.cookies.set(RETURN_TO_COOKIE, validated.returnTo.toString(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: RETURN_TO_COOKIE_MAX_AGE_SECONDS,
  });
  return response;
}

