import type { Metadata } from "next";

import { AuthShell } from "@kvshvl/platform-design-system";
import { DEFAULT_RETURN_TO_APP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <AuthShell title="Page not found">
      <p className="text-muted">This URL is not part of KVSHVL sign-in.</p>
      <p className="text-muted">
        <a href={DEFAULT_RETURN_TO_APP}>Back to app</a>
      </p>
    </AuthShell>
  );
}
