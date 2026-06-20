import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { HandoffRedirect } from "@/components/HandoffRedirect";
import { RETURN_TO_COOKIE } from "@/lib/constants";
import { issuePlatformJwt } from "@/lib/platform-jwt";
import { validateReturnTo } from "@/lib/return-to";

export async function generateMetadata({ searchParams }: HandoffPageProps): Promise<Metadata> {
  const params = await searchParams;
  const cookieStore = await cookies();
  const returnToRaw =
    params.return_to ?? cookieStore.get(RETURN_TO_COOKIE)?.value ?? null;
  const validated = validateReturnTo(returnToRaw);

  if (!validated.ok) {
    return { title: "Could not complete sign-in" };
  }

  return { title: "Completing sign-in" };
}

const AUDIENCE = "kvshvl-platform";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

type HandoffPageProps = {
  searchParams: Promise<{ return_to?: string }>;
};

export default async function HandoffPage({ searchParams }: HandoffPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const returnToRaw =
    params.return_to ?? cookieStore.get(RETURN_TO_COOKIE)?.value ?? null;
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
    redirect(
      `/sign-in?return_to=${encodeURIComponent(validated.returnTo.toString())}`,
    );
  }

  const issuer = requiredEnv("AUTH_URL");
  const secret = requiredEnv("AUTH_SECRET");

  const token = await issuePlatformJwt(
    { email, sub, name: session?.user?.name ?? null },
    { secret, issuer, audience: AUDIENCE, expiresInSeconds: 60 * 60 * 24 },
  );

  return (
    <HandoffRedirect returnTo={validated.returnTo.toString()} token={token} />
  );
}
