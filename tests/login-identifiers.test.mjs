import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeLoginAlias,
  parseLoginAliases,
  authenticateLoginAlias,
} from "../lib/login-identifiers.ts";
import { POST } from "../app/api/auth/resolve-identifier/route.ts";
test("Rwanda phone formats map to one linked identifier", () => {
  for (const value of [
    "0780000000",
    "+250780000000",
    "250780000000",
    "078 000 0000",
  ])
    assert.equal(normalizeLoginAlias(value), "+250780000000");
  assert.equal(normalizeLoginAlias(" Customer.One "), "customer.one");
  assert.equal(normalizeLoginAlias("../private"), null);
});
test("unknown aliases and inherited object names never resolve an account", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls++;
    throw new Error("should not call provider");
  };
  assert.equal(
    await authenticateLoginAlias(
      "unknown",
      "password",
      {},
      "key",
      "https://example.test",
      fetcher,
    ),
    null,
  );
  assert.equal(
    await authenticateLoginAlias(
      "constructor",
      "password",
      {},
      "key",
      "https://example.test",
      fetcher,
    ),
    null,
  );
  assert.equal(calls, 0);
});
test("alias resolution requires a successful password check and returns only email", async () => {
  const aliases = parseLoginAliases('{"0780000000":"customer@example.test"}');
  assert.equal(
    await authenticateLoginAlias(
      "0780000000",
      "wrong-pass",
      aliases,
      "key",
      "https://example.test",
      async () => new Response("{}", { status: 400 }),
    ),
    null,
  );
  const result = await authenticateLoginAlias(
    "+250780000000",
    "correct-pass",
    aliases,
    "key",
    "https://example.test",
    async (url, options) => {
      assert.equal(JSON.parse(options.body).email, "customer@example.test");
      return Response.json({
        email: "customer@example.test",
        idToken: "not-returned",
        refreshToken: "not-returned",
      });
    },
  );
  assert.deepEqual(result, { email: "customer@example.test" });
  assert.equal(
    await authenticateLoginAlias(
      "0780000000",
      "correct-pass",
      aliases,
      "key",
      "https://example.test",
      async () =>
        Response.json({ email: "someone-else@example.test", idToken: "token" }),
    ),
    null,
  );
});
test("credential resolver refuses cross-origin requests", async () => {
  const response = await POST(
    new Request("https://example.test/api/auth/resolve-identifier", {
      method: "POST",
      headers: {
        origin: "https://other.test",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        identifier: "0780000000",
        password: "test-password",
      }),
    }),
  );
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("cache-control"), "no-store, private");
});
