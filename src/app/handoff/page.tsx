import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { issuePlatformJwt } from "@/lib/platform-jwt";
import { validateReturnTo } from "@/lib/return-to";

const RETURN_TO_COOKIE = "kvshvl_return_to";
const AUDIENCE = "kvshvl-platform";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

export default async function HandoffPage() {
  const cookieStore = await cookies();
  const returnToRaw = cookieStore.get(RETURN_TO_COOKIE)?.value ?? null;
  const validated = validateReturnTo(returnToRaw);

  if (!validated.ok) {
    return (
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 20px" }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Could not complete sign-in</h1>
        <p style={{ marginTop: 10, color: "#444", lineHeight: 1.6 }}>
          {validated.reason}
        </p>
      </main>
    );
  }

  const session = await auth();
  const email = session?.user?.email ?? null;
  const sub = (session?.user as { id?: string } | undefined)?.id ?? null;

  if (!email || !sub) {
    redirect(`/sign-in?return_to=${encodeURIComponent(validated.returnTo.toString())}`);
  }

  const issuer = requiredEnv("AUTH_URL");
  const secret = requiredEnv("AUTH_SECRET");

  const token = await issuePlatformJwt(
    { email, sub, name: session?.user?.name ?? null },
    { secret, issuer, audience: AUDIENCE, expiresInSeconds: 60 * 60 * 24 },
  );

  cookieStore.set(RETURN_TO_COOKIE, "", { maxAge: 0, path: "/" });

  const destination = new URL(validated.returnTo.toString());
  destination.hash = `access_token=${encodeURIComponent(token)}`;
  redirect(destination.toString());
}

