import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const readSource = (relativePath) =>
  readFileSync(new URL(`../src/${relativePath}`, import.meta.url), "utf8");

const assertMarked = (source, labels) => {
  for (const label of labels) {
    assert.ok(
      source.includes(`${label} <RequiredMark />`),
      `expected "${label}" to have a required marker`,
    );
  }
};

const assertUnmarked = (source, labels) => {
  for (const label of labels) {
    assert.ok(
      !source.includes(`${label} <RequiredMark />`),
      `expected "${label}" to remain optional`,
    );
  }
};

const inputFieldBlock = (source, label) => {
  const start = source.indexOf(`label="${label}"`);
  assert.notEqual(start, -1, `expected InputField label "${label}"`);
  const end = source.indexOf("/>", start);
  return source.slice(start, end);
};

test("required marker is visual and announced to assistive technology", () => {
  const source = readSource("components/RequiredMark.jsx");

  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /className="sr-only"> \(required\)/);
});

test("login and registration mark every required field", () => {
  const login = readSource("pages/Login.jsx");
  const register = readSource("pages/ReisterPage.jsx");

  assertMarked(login, ["Email Address", "Password"]);
  assertMarked(register, [
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
  assert.match(register, /invoicing purposes <RequiredMark \/>/);
  assertUnmarked(register, ["Invoice Suffix (e.g. for Services, for Products)"]);
});

test("customer forms mark name and address while leaving contact fields optional", () => {
  const create = readSource("components/customers/CreateCustomer.jsx");
  const update = readSource("components/UpdateCustomerDetails.jsx");

  assert.match(inputFieldBlock(create, "Full Name"), /\brequired\b/);
  assert.match(inputFieldBlock(create, "Physical Address"), /\brequired\b/);
  assert.doesNotMatch(inputFieldBlock(create, "Email Address"), /\brequired\b/);
  assert.doesNotMatch(inputFieldBlock(create, "Mobile Number"), /\brequired\b/);
  assertMarked(update, ["Full Name", "Customer Address"]);
  assertUnmarked(update, ["Email Address", "Mobile Number"]);
});

test("profile and password forms distinguish required and optional fields", () => {
  const profile = readSource("pages/Profile.jsx");

  assertMarked(profile, [
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
    "Current Password",
    "New Password",
    "Confirm New Password",
  ]);
  assertUnmarked(profile, [
    "Email Address",
    "Invoice Suffix",
    "Update Logo",
    "Update Stamp",
  ]);
});

test("invoice form marks only fields required by the invoice API", () => {
  const invoice = readSource("pages/CreateInvoice.jsx");

  assertMarked(invoice, [
    "Select Customer",
    "Description",
    "Qnt",
    "Price",
    "Invoice Number",
    "Creation Date",
  ]);
  assert.match(invoice, />\s*Date\s*<\/label>/);
  assert.match(invoice, />\s*Doc Type\s*<\/label>/);
});
