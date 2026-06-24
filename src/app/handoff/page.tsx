import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PageShell, theme } from "@/components/PageShell";
import {
  PLATFORM_JWT_AUDIENCE,
  getPlatformJwtTtlSeconds,
} from "@/lib/constants";
import { createHandoffCode } from "@/lib/handoff-code";
import { issuePlatformJwt } from "@/lib/platform-jwt";
import { resolveReturnTo } from "@/lib/return-to";

export async function generateMetadata({ searchParams }: HandoffPageProps): Promise<Metadata> {
  const params = await searchParams;
  const validated = await resolveReturnTo(params.return_to);

  if (!validated.ok) {
    return { title: "Could not complete sign-in" };
  }

  return { title: "Completing sign-in" };
}

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
  const validated = await resolveReturnTo(params.return_to);

  if (!validated.ok) {
    return (
      <PageShell title="Could not complete sign-in">
        <p style={{ marginTop: 10, color: theme.textMuted, lineHeight: 1.6 }}>
          {validated.reason}
        </p>
      </PageShell>
    );
  }

  const session = await auth();
  const email = session?.user?.email ?? null;
  const sub = session?.user?.id ?? null;

  if (!email || !sub) {
    redirect(
      `/sign-in?return_to=${encodeURIComponent(validated.returnTo.toString())}`,
    );
  }

  const issuer = requiredEnv("AUTH_URL");
  const secret = requiredEnv("AUTH_SECRET");

  const token = await issuePlatformJwt(
    { email, sub, name: session?.user?.name ?? null },
    {
      secret,
      issuer,
      audience: PLATFORM_JWT_AUDIENCE,
      expiresInSeconds: getPlatformJwtTtlSeconds(),
    },
  );

  const handoffCode = await createHandoffCode(token, secret);
  const destination = new URL(validated.returnTo.toString());
  destination.searchParams.set("handoff_code", handoffCode);

  redirect(destination.toString());
}
