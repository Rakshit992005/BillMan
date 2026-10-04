import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("invoice preview does not transform the customer name casing", () => {
  const source = readFileSync(
    new URL("../src/components/invoices/InvoicePreview.jsx", import.meta.url),
    "utf8",
  );
  const customerName = source.match(
    /<span className="([^"]*)">\s*: \{customer\?\.name \|\| "-+"\}\s*<\/span>/,
  );

  assert.ok(customerName, "expected the customer name in the invoice preview");
  assert.doesNotMatch(customerName[1], /(?:^|\s)capitalize(?:\s|$)/);
});
