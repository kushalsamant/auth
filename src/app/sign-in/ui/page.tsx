import Link from "next/link";
import { cookies } from "next/headers";
import { signIn } from "@/auth";
import { RETURN_TO_COOKIE } from "@/lib/constants";
import { validateReturnTo } from "@/lib/return-to";

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

export default async function SignInUiPage() {
  const cookieStore = await cookies();
  const returnTo = cookieStore.get(RETURN_TO_COOKIE)?.value ?? "";

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px" }}>
      <h1 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>KVSHVL</h1>
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

      <p style={{ marginTop: 18, color: "#666", fontSize: 12, lineHeight: 1.6 }}>
        Return target:{" "}
        <code style={{ background: "#f6f6f6", padding: "2px 6px", borderRadius: 6 }}>
          {returnTo || "(missing)"}
        </code>
      </p>

      <p style={{ marginTop: 18, color: "#666", fontSize: 12, lineHeight: 1.6 }}>
        <Link href="https://www.kvshvl.in">Back to kvshvl.in</Link>
      </p>
    </main>
  );
}

