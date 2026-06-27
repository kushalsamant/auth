import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { AuthShell } from "@kvshvl/platform-design-system";
import { RETURN_TO_COOKIE } from "@/lib/constants";

import { AuthErrorContent } from "./auth-error-content";

export const metadata: Metadata = {
  title: "Sign-in error",
};

function appOriginFromReturnTo(returnTo: string): string | null {
  try {
    return new URL(returnTo).origin;
  } catch {
    return null;
  }
}

export default async function AuthErrorPage() {
  const cookieStore = await cookies();
  const returnTo = cookieStore.get(RETURN_TO_COOKIE)?.value ?? "";
  const backHref = appOriginFromReturnTo(returnTo);

  return (
    <Suspense
      fallback={
        <AuthShell title="Sign-in error">
          <p className="text-muted">Loading…</p>
        </AuthShell>
      }
    >
      <AuthErrorContent backHref={backHref} />
    </Suspense>
  );
}
