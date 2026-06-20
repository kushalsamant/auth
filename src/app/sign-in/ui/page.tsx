import type { Metadata } from "next";
import { cookies } from "next/headers";
import { signIn } from "@/auth";
import { RETURN_TO_COOKIE } from "@/lib/constants";
import { validateReturnTo } from "@/lib/return-to";

export const metadata: Metadata = {
  title: "Sign in",
};

async function signInWithGoogle() {
  "use server";
  const cookieStore = await cookies();
  const returnToRaw = cookieStore.get(RETURN_TO_COOKIE)?.value ?? null;
  const validated = validateReturnTo(returnToRaw);

  if (!validated.ok) {
    throw new Error(validated.reason);
  }

  await signIn("google", {
    redirectTo: `/handoff?return_to=${encodeURIComponent(validated.returnTo.toString())}`,
  });
}

function appOriginFromReturnTo(returnTo: string): string | null {
  if (!returnTo) {
    return null;
  }

  try {
    return new URL(returnTo).origin;
  } catch {
    return null;
  }
}

export default async function SignInUiPage() {
  const cookieStore = await cookies();
  const returnTo = cookieStore.get(RETURN_TO_COOKIE)?.value ?? "";
  const appOrigin = appOriginFromReturnTo(returnTo);

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px" }}>
      <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>Sign in</h1>
      <p style={{ marginTop: 10, color: "#444", lineHeight: 1.6 }}>
        Sign in with Google to continue.
      </p>

      <div style={{ marginTop: 24 }}>
        <form action={signInWithGoogle}>
          <button
            type="submit"
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: 10,
              background: "#f12345",
              color: "white",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "inherit",
            }}
          >
            Sign in with Google
          </button>
        </form>
      </div>

      {appOrigin && (
        <p style={{ marginTop: 18, color: "#666", fontSize: 12, lineHeight: 1.6 }}>
          <a href={appOrigin}>Back to app</a>
        </p>
      )}
    </main>
  );
}
