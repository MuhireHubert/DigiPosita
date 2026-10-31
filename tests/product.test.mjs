import { test } from "node:test";
import assert from "node:assert/strict";
import { summarizeActivity, attentionItems } from "../lib/activity.ts";
import { normalizeTrackingCode } from "../lib/tracking.ts";
const item = (id, status, source = "service_requests", time = 0) => ({
  id,
  status,
  source,
  createdAt: { toMillis: () => time },
});
test("workspace counts separate active, moving and terminal work", () => {
  const items = [
    item("a", "requested", "pickups"),
    item("b", "en_route", "deliveries"),
    item("c", "action_required"),
    item("d", "completed"),
    item("e", "delivered", "pickups"),
    item("f", "cancelled"),
    item("g", "rejected"),
    item("h", "approved"),
  ];
  assert.deepEqual(summarizeActivity(items), {
    active: 4,
    moving: 1,
    attention: 1,
    completed: 2,
  });
  assert.deepEqual(summarizeActivity([]), {
    active: 0,
    moving: 0,
    attention: 0,
    completed: 0,
  });
});
test("attention queues are role specific, oldest first and do not mutate the stream", () => {
  const input = [
    item("new", "submitted", "service_requests", 30),
    item("reply", "action_required", "service_requests", 20),
    item("old", "requested", "pickups", 10),
    item("done", "completed", "service_requests", 1),
  ];
  assert.deepEqual(
    attentionItems(input, true).map((i) => i.id),
    ["old", "new"],
  );
  assert.deepEqual(
    attentionItems(input).map((i) => i.id),
    ["reply"],
  );
  assert.deepEqual(
    input.map((i) => i.id),
    ["new", "reply", "old", "done"],
  );
});
test("tracking normalizes real references and rejects malformed document paths", () => {
  assert.equal(
    normalizeTrackingCode("  dp-p-abcdefghijklmnopqrst  "),
    "DP-P-ABCDEFGHIJKLMNOPQRST",
  );
  assert.equal(
    normalizeTrackingCode("DP-D-12345678901234567890"),
    "DP-D-12345678901234567890",
  );
  for (const value of [
    "",
    "../private",
    "DP-X-12345678901234567890",
    "DP-P-1234567890123456789",
    "DP-P-123456789012345678901",
    "DP-P-1234567890123456789/",
  ])
    assert.equal(normalizeTrackingCode(value), null);
});
