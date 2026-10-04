import { test, expect } from "@playwright/test";
import process from "node:process";

const requiredLabels = async (page, labels) => {
  for (const text of labels) {
    const label = page.locator("label").filter({ hasText: text }).first();
    await expect(label, `required label: ${text}`).toBeVisible();
    await expect(label.locator('[aria-hidden="true"]')).toHaveText("*");
    await expect(label.locator(".sr-only")).toContainText("required");
  }
};

const optionalLabel = async (page, text) => {
  const label = page.locator("label").filter({ hasText: text }).first();
  await expect(label, `optional label: ${text}`).toBeVisible();
  await expect(label.locator('[aria-hidden="true"]')).toHaveCount(0);
};

test("required indicators match BillMan form validation", async ({ page }) => {
  const email = process.env.E2E_EMAIL;
  const password = process.env.E2E_PASSWORD;
  test.skip(!email || !password, "E2E_EMAIL and E2E_PASSWORD are required");

  await page.goto("/register");
  await requiredLabels(page, [
    "Full Name",
    "Email Address",
    "Company Name",
    "Mobile Number",
    "Full Business Address",
    "Company Logo",
    "Company Stamp",
    "Bank Name",
    "Account Number",
    "IFSC Code",
    "Branch Name",
    "PAN Number",
    "UPI ID",
    "Create Password",
    "Confirm Password",
  ]);
  await optionalLabel(page, "Invoice Suffix");

  await page.goto("/login");
  await requiredLabels(page, ["Email Address", "Password"]);
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole("button", { name: "Sign in to BillMan" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);

  await page.goto("/customer");
  await expect(page.getByRole("heading", { name: "Customers" })).toBeVisible();
  await requiredLabels(page, ["Full Name", "Physical Address"]);
  await optionalLabel(page, "Email Address");
  await optionalLabel(page, "Mobile Number");

  await page.goto("/createinvoice");
  await requiredLabels(page, [
    "Select Customer",
    "Description",
    "Qnt",
    "Price",
    "Invoice Number",
    "Creation Date",
  ]);
  await optionalLabel(page, "Doc Type");
  const itemDate = page.locator("label").filter({ hasText: /^\s*Date\s*$/ });
  await expect(itemDate).toBeVisible();
  await expect(itemDate.locator('[aria-hidden="true"]')).toHaveCount(0);

  await page.goto("/profile");
  await page.getByRole("button", { name: "Update Details" }).click();
  await requiredLabels(page, [
    "Full Name",
    "Company Name",
    "Mobile Number",
    "Company Address",
    "Bank Name",
    "Branch Name",
    "Account Number",
    "IFSC Code",
    "PAN Number",
    "UPI ID",
  ]);
  await optionalLabel(page, "Email Address");
  await optionalLabel(page, "Invoice Suffix");
  await optionalLabel(page, "Update Logo");
  await optionalLabel(page, "Update Stamp");

  await page.getByRole("button", { name: "Change Password" }).click();
  await requiredLabels(page, [
    "Current Password",
    "New Password",
    "Confirm New Password",
  ]);
});
