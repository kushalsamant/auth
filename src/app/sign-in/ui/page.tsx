import Link from "next/link";
import { cookies } from "next/headers";

const RETURN_TO_COOKIE = "kvshvl_return_to";

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
        <a
          href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent("/handoff")}`}
          style={{
            display: "inline-block",
            padding: "10px 14px",
            borderRadius: 10,
            background: "#f12345",
            color: "white",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Sign in with Google
        </a>
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

