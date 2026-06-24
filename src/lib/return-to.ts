import { cookies } from "next/headers";
import { RETURN_TO_COOKIE } from "@/lib/constants";

export type ReturnToValidationResult =
  | { ok: true; returnTo: URL }
  | { ok: false; reason: string };

export function getReturnToAllowlist(): string[] | null {
  const raw = process.env.AUTH_RETURN_TO_ALLOWLIST;
  if (!raw?.trim()) {
    return null;
  }

  return raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function hostnameFromAllowlistEntry(entry: string): string | null {
  try {
    const url = new URL(entry.includes("://") ? entry : `https://${entry}`);
    return url.hostname.toLowerCase();
  } catch {
    return null;
  }
}

function hostMatchesWildcardKvshvl(host: string): boolean {
  return host.endsWith(".kvshvl.in");
}

function hostMatchesAllowlist(host: string, allowlist: string[]): boolean {
  return allowlist.some((entry) => hostnameFromAllowlistEntry(entry) === host);
}

export function isReturnToHostAllowed(
  host: string,
  allowlist: string[] | null = getReturnToAllowlist(),
): boolean {
  const normalizedHost = host.toLowerCase();

  if (allowlist && allowlist.length > 0) {
    return hostMatchesAllowlist(normalizedHost, allowlist);
  }

  return hostMatchesWildcardKvshvl(normalizedHost);
}

export function validateReturnTo(raw: string | null): ReturnToValidationResult {
  if (!raw) return { ok: false, reason: "Missing return_to." };

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, reason: "Invalid return_to URL." };
  }

  if (url.protocol !== "https:") {
    return { ok: false, reason: "return_to must be https." };
  }

  const host = url.hostname.toLowerCase();
  if (!isReturnToHostAllowed(host)) {
    return { ok: false, reason: "return_to is not an allowed app URL." };
  }

  return { ok: true, returnTo: url };
}

export async function resolveReturnTo(
  returnToParam: string | undefined,
): Promise<ReturnToValidationResult> {
  const cookieStore = await cookies();
  const returnToRaw =
    returnToParam ?? cookieStore.get(RETURN_TO_COOKIE)?.value ?? null;
  return validateReturnTo(returnToRaw);
}
