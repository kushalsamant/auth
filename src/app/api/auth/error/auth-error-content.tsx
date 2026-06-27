"use client";

import { useSearchParams } from "next/navigation";

import { AuthShell } from "@kvshvl/platform-design-system";
import { authErrorMessage } from "@/lib/auth-error-messages";

type AuthErrorContentProps = {
  backHref: string | null;
};

export function AuthErrorContent({ backHref }: AuthErrorContentProps) {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const message = authErrorMessage(errorCode);

  return (
    <AuthShell title="Sign-in error">
      <p className="text-muted">{message}</p>
      <p>
        <a href="/sign-in/ui">Try again</a>
      </p>
      {backHref && (
        <p className="text-muted">
          <a href={backHref}>Back to app</a>
        </p>
      )}
    </AuthShell>
  );
}
