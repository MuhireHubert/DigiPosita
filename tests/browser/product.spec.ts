import { test, expect, type Page } from "@playwright/test";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
// These tests intentionally use only local emulators and a demo project.
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9198";
process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8188";
const app = initializeApp({ projectId: "demo-digiposita" }, "browser-tests");
const password = "Demo-password-2468";
let customerEmail: string;
let staffEmail: string;
test.beforeAll(async () => {
  const stamp = Date.now();
  customerEmail = `customer-${stamp}@example.com`;
  staffEmail = `staff-${stamp}@example.com`;
  const auth = getAuth(app);
  await auth.createUser({ email: customerEmail, password });
  const staff = await auth.createUser({ email: staffEmail, password });
  await auth.setCustomUserClaims(staff.uid, { staff: true });
});
async function login(page: Page, email: string) {
  await page.goto("/login");
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Every request. One place." }),
  ).toBeVisible();
}
test("customer booking → staff processing → public tracking, delivery cancellation and isolation", async ({
  browser,
}) => {
  const customer = await browser.newContext();
  const staff = await browser.newContext();
  const visitor = await browser.newContext();
  const page = await customer.newPage();
  const ops = await staff.newPage();
  const publicPage = await visitor.newPage();
  const errors: string[] = [];
  for (const p of [page, ops, publicPage])
    p.on("pageerror", (e) => errors.push(e.message));
  await login(page, customerEmail);
  await page.goto("/staff");
  await expect(
    page.getByText("This workspace is available to authorized staff only."),
  ).toBeVisible();
  await page.goto("/pickups");
  await page.getByLabel("Contact name").fill("Customer One");
  await page.getByLabel("Phone", { exact: true }).fill("+250788123456");
  await page.getByLabel("Pickup address").fill("Kigali test collection");
  await page.getByLabel("Weight (kg)").fill("2");
  await page.getByRole("button", { name: "Request pickup" }).click();
  await expect(
    page.getByRole("heading", { name: "Pickup requested" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "View my requests" }).click();
  await expect(page.getByText("Kigali test collection")).toBeVisible();
  await login(ops, staffEmail);
  await ops.goto("/staff");
  await ops.getByRole("button", { name: "Mark scheduled" }).first().click();
  await expect(
    ops.getByRole("button", { name: "Mark collected" }).first(),
  ).toBeVisible();
  const link = page.getByRole("link", { name: /Track DP-P-/ }).first();
  await expect(link).toBeVisible();
  const href = await link.getAttribute("href");
  await publicPage.goto(href!);
  await publicPage.getByRole("button", { name: "Track", exact: true }).click();
  await expect(
    publicPage.getByRole("paragraph").filter({ hasText: /^accepted$/i }),
  ).toHaveCount(2);
  await ops.getByRole("button", { name: "Mark collected" }).first().click();
  await ops.getByRole("button", { name: "Mark delivered" }).first().click();
  await publicPage.getByRole("button", { name: "Track", exact: true }).click();
  await expect(
    publicPage.getByRole("paragraph").filter({ hasText: /^delivered$/i }),
  ).toHaveCount(2);
  await page.goto("/deliveries");
  await page.getByLabel("Your name").fill("Customer One");
  await page.getByLabel("Contact phone").fill("+250788123456");
  await page
    .getByLabel("From (e.g. Musanze farm)", { exact: true })
    .fill("Musanze");
  await page
    .getByLabel("To (e.g. Kimironko supermarket)", { exact: true })
    .fill("Kigali");
  await page
    .getByLabel("Goods (e.g. Irish potatoes)", { exact: true })
    .fill("Books");
  await page.getByLabel("Weight (kg)", { exact: true }).fill("3");
  await page.getByRole("button", { name: "Request delivery" }).click();
  await expect(page.getByRole("status")).toContainText("Delivery requested.");
  await page.goto("/account");
  await page.getByRole("button", { name: "Cancel request" }).click();
  await expect(page.getByText("cancelled", { exact: true })).toBeVisible();
  await ops.goto("/account");
  await expect(ops.getByText("No pickups yet.")).toBeVisible();
  await expect(ops.getByText("Kigali test collection")).toHaveCount(0);
  await publicPage.goto("/account");
  await expect(
    publicPage.getByRole("link", { name: "Sign in or create an account" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  await customer.close();
  await staff.close();
  await visitor.close();
});
test("mobile home fits viewport and core navigation remains available", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Your post office/ }),
  ).toBeVisible();
  await expect(page.getByRole("navigation")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
