import type { Metadata } from "next";

import { AuthShell } from "@kvshvl/platform-design-system";
import { DEFAULT_RETURN_TO_APP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Could not start sign-in",
};

type SignInErrorPageProps = {
  searchParams: Promise<{ reason?: string }>;
};

export default async function SignInErrorPage({
  searchParams,
}: SignInErrorPageProps) {
  const params = await searchParams;
  const reason = params.reason?.trim() || "Sign-in could not start.";

  return (
    <AuthShell title="Could not start sign-in">
      <p className="text-muted">{reason}</p>
      <p className="text-muted">
        <a href={DEFAULT_RETURN_TO_APP}>Back to app</a>
      </p>
    </AuthShell>
  );
}
