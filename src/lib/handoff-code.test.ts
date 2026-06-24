import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createHandoffCode, exchangeHandoffCode } from "./handoff-code";

describe("handoff code exchange", () => {
  it("round-trips a platform JWT", async () => {
    const secret = "test-secret-at-least-32-characters-long";
    const platformJwt = "eyJhbGciOiJIUzI1NiJ9.test.signature";

    const code = await createHandoffCode(platformJwt, secret);
    const exchanged = await exchangeHandoffCode(code, secret);

    assert.equal(exchanged, platformJwt);
  });

  it("rejects an invalid code", async () => {
    const exchanged = await exchangeHandoffCode(
      "not-a-valid-code",
      "test-secret-at-least-32-characters-long",
    );
    assert.equal(exchanged, null);
  });
});
