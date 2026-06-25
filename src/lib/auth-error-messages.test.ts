import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { authErrorMessage } from "./auth-error-messages";

describe("authErrorMessage", () => {
  it("maps known Auth.js error codes", () => {
    assert.equal(
      authErrorMessage("AccessDenied"),
      "Sign-in was cancelled or this account cannot be used.",
    );
    assert.equal(
      authErrorMessage("Verification"),
      "This sign-in link has expired. Try again.",
    );
  });

  it("falls back for unknown or missing codes", () => {
    assert.equal(
      authErrorMessage("NotARealCode"),
      "Sign-in did not complete. Try again.",
    );
    assert.equal(
      authErrorMessage(null),
      "Sign-in did not complete. Try again.",
    );
  });
});
