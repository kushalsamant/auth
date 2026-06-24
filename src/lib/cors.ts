import { getReturnToAllowlist } from "@/lib/return-to";

function hostnameFromOrigin(origin: string): string | null {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function originMatchesAllowlistEntry(origin: string, entry: string): boolean {
  try {
    const allowed = new URL(
      entry.includes("://") ? entry : `https://${entry}`,
    ).origin;
    return allowed === origin;
  } catch {
    return false;
  }
}

export function isAllowedCorsOrigin(origin: string | null): boolean {
  if (!origin) {
    return false;
  }

  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    return false;
  }

  if (parsed.protocol !== "https:") {
    return false;
  }

  const allowlist = getReturnToAllowlist();
  if (allowlist && allowlist.length > 0) {
    return allowlist.some((entry) => originMatchesAllowlistEntry(origin, entry));
  }

  const host = hostnameFromOrigin(origin);
  return host !== null && host.endsWith(".kvshvl.in");
}

export function corsHeaders(origin: string | null): HeadersInit {
  if (!origin || !isAllowedCorsOrigin(origin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}
