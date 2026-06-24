import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  isReturnToHostAllowed,
  validateReturnTo,
} from "./return-to";

describe("validateReturnTo", () => {
  it("accepts a valid checkyourdrawings URL", () => {
    const result = validateReturnTo(
      "https://checkyourdrawings.kvshvl.in/auth/callback",
    );
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.equal(
        result.returnTo.toString(),
        "https://checkyourdrawings.kvshvl.in/auth/callback",
      );
    }
  });

  it("accepts any *.kvshvl.in subdomain when no allowlist is set", () => {
    const result = validateReturnTo("https://evil.kvshvl.in/callback");
    assert.equal(result.ok, true);
  });

  it("rejects missing return_to", () => {
    const result = validateReturnTo(null);
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "Missing return_to.");
    }
  });

  it("rejects malformed URLs", () => {
    const result = validateReturnTo("not-a-url");
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "Invalid return_to URL.");
    }
  });

  it("rejects non-https URLs", () => {
    const result = validateReturnTo(
      "http://checkyourdrawings.kvshvl.in/auth/callback",
    );
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "return_to must be https.");
    }
  });

  it("rejects apex kvshvl.in", () => {
    const result = validateReturnTo("https://kvshvl.in/");
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "return_to is not an allowed app URL.");
    }
  });

  it("rejects localhost", () => {
    const result = validateReturnTo("http://localhost:3000/auth/callback");
    assert.equal(result.ok, false);
  });

  it("rejects hosts outside kvshvl.in", () => {
    const result = validateReturnTo("https://example.com/callback");
    assert.equal(result.ok, false);
  });
});

describe("isReturnToHostAllowed with explicit allowlist", () => {
  const allowlist = ["https://checkyourdrawings.kvshvl.in"];

  it("allows an allowlisted host", () => {
    assert.equal(
      isReturnToHostAllowed("checkyourdrawings.kvshvl.in", allowlist),
      true,
    );
  });

  it("rejects a non-allowlisted kvshvl.in subdomain", () => {
    assert.equal(isReturnToHostAllowed("evil.kvshvl.in", allowlist), false);
  });
});
