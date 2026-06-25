import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { PageShell } from "@/components/PageShell";
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
        <PageShell title="Sign-in error">
          <p className="text-muted">Loading…</p>
        </PageShell>
      }
    >
      <AuthErrorContent backHref={backHref} />
    </Suspense>
  );
}
