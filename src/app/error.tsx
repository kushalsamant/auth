"use client";

import { PageShell } from "@/components/PageShell";
import { DEFAULT_RETURN_TO_APP } from "@/lib/constants";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <PageShell title="Something went wrong">
      <p className="text-muted">Sign-in hit an unexpected error.</p>
      <p>
        <button type="button" className="action-primary" onClick={reset}>
          Try again
        </button>
      </p>
      <p className="text-muted">
        <a href={DEFAULT_RETURN_TO_APP}>Back to app</a>
      </p>
    </PageShell>
  );
}
