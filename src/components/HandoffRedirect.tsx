"use client";

import { useEffect } from "react";
import { PageShell, theme } from "@/components/PageShell";

type HandoffRedirectProps = {
  returnTo: string;
  token: string;
};

export function HandoffRedirect({ returnTo, token }: HandoffRedirectProps) {
  useEffect(() => {
    const destination = new URL(returnTo);
    destination.hash = `access_token=${encodeURIComponent(token)}`;
    window.location.replace(destination.toString());
  }, [returnTo, token]);

  return (
    <PageShell title="Completing sign-in">
      <p style={{ marginTop: 10, color: theme.textMuted, lineHeight: 1.6 }}>
        Returning you to the app…
      </p>
    </PageShell>
  );
}
