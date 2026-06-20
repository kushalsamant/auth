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
      <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>Completing sign-in</h1>
      <p style={{ marginTop: 10, color: "#444", lineHeight: 1.6 }}>Returning you to the app…</p>
    </main>
  );
}
