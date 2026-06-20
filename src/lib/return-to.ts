export type ReturnToValidationResult =
  | { ok: true; returnTo: URL }
  | { ok: false; reason: string };

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
  if (!host.endsWith(".kvshvl.in")) {
    return { ok: false, reason: "return_to must be under *.kvshvl.in." };
  }

  return { ok: true, returnTo: url };
}

