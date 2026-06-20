"use client";

import { useEffect } from "react";

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
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px" }}>
      <p style={{ margin: 0, color: "#444" }}>Completing sign-in…</p>
    </main>
  );
}
