import test from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";

import customerModel from "../src/models/customer.model.js";

test("customer names preserve the casing entered by the user", () => {
    const customer = new customerModel({
        name: "ABC build",
        address: "Test address",
        userId: new mongoose.Types.ObjectId(),
    });

    assert.equal(customer.name, "ABC build");
});
