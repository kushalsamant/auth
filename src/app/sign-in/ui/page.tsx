import type { Metadata } from "next";
import { cookies } from "next/headers";
import { signIn } from "@/auth";
import { AuthShell } from "@kvshvl/platform-design-system";
import { RETURN_TO_COOKIE } from "@/lib/constants";
import { validateReturnTo } from "@/lib/return-to";

export const metadata: Metadata = {
  title: {
    absolute: "KVSHVL",
  },
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
    <AuthShell title="KVSHVL">
      <p className="text-muted">One sign-in for all KVSHVL apps.</p>

      <form action={signInWithGoogle}>
        <button type="submit" className="action-primary">Sign in with Google</button>
      </form>

      {appOrigin && (
        <p className="text-muted">
          <a href={appOrigin}>Back to app</a>
        </p>
      )}
    </AuthShell>
  );
}
