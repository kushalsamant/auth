const AUTH_ERROR_MESSAGES: Record<string, string> = {
  AccessDenied: "Sign-in was cancelled or this account cannot be used.",
  Callback: "Sign-in did not complete. Try again.",
  Configuration: "Sign-in is temporarily unavailable.",
  CredentialsSignin: "Sign-in did not complete. Try again.",
  EmailCreateAccount: "Sign-in did not complete. Try again.",
  EmailSignin: "Sign-in did not complete. Try again.",
  OAuthAccountNotLinked: "This email is already linked to another sign-in method.",
  OAuthCallback: "Sign-in did not complete. Try again.",
  OAuthCreateAccount: "Sign-in did not complete. Try again.",
  OAuthSignin: "Sign-in did not complete. Try again.",
  SessionRequired: "Sign in to continue.",
  Verification: "This sign-in link has expired. Try again.",
};

export function authErrorMessage(errorCode: string | null | undefined): string {
  if (!errorCode) {
    return AUTH_ERROR_MESSAGES.Callback;
  }

  return AUTH_ERROR_MESSAGES[errorCode] ?? AUTH_ERROR_MESSAGES.Callback;
}
