export const RETURN_TO_COOKIE = "kvshvl_return_to";

export const RETURN_TO_COOKIE_MAX_AGE_SECONDS = 10 * 60;

export const PLATFORM_JWT_AUDIENCE = "kvshvl-platform";

const DEFAULT_PLATFORM_JWT_TTL_SECONDS = 60 * 60 * 2;

export function getPlatformJwtTtlSeconds(): number {
  const raw = process.env.AUTH_PLATFORM_JWT_TTL_SECONDS;
  if (!raw) {
    return DEFAULT_PLATFORM_JWT_TTL_SECONDS;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0
    ? parsed
    : DEFAULT_PLATFORM_JWT_TTL_SECONDS;
}

export const DEFAULT_RETURN_TO_APP = "https://checkyourdrawings.kvshvl.in";
