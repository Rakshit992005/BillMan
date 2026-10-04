import "dotenv/config";
import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import app from "../src/app.js";
import connectDB from "../src/db/db.js";
import customerModel from "../src/models/customer.model.js";
import userModel from "../src/models/user.model.js";

test("customer casing survives the authenticated dev database API flow", async () => {
    let server;
    let createdCustomerId;
    let userId;

    try {
        await connectDB();

        const user = await userModel.findOne().select("_id").lean();
        assert.ok(user, "the dev database needs at least one user");
        userId = user._id;

        server = app.listen(0, "127.0.0.1");
        await once(server, "listening");

        const token = jwt.sign(
            { id: userId.toString() },
            process.env.JWT_SECRET,
            { algorithm: "HS256", expiresIn: "5m" },
        );
        const baseUrl = `http://127.0.0.1:${server.address().port}/api/customer`;
        const headers = {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
            Origin: "http://localhost:5173",
        };

        const createResponse = await fetch(`${baseUrl}/create-customer/`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                name: "ABC build",
                email: "case-test@example.invalid",
                mobile: "0000000000",
                address: "Temporary casing test",
            }),
        });
        const createBody = await createResponse.json();

        assert.equal(createResponse.status, 201);
        assert.equal(createBody.customer.name, "ABC build");
        createdCustomerId = createBody.customer._id;

        const listResponse = await fetch(`${baseUrl}/get-all-customers/`, {
            headers,
        });
        const listBody = await listResponse.json();
        const persistedCustomer = listBody.customers.find(
            (customer) => customer._id === createdCustomerId,
        );

        assert.equal(listResponse.status, 200);
        assert.equal(persistedCustomer?.name, "ABC build");
    } finally {
        if (createdCustomerId && userId) {
            await customerModel.deleteOne({ _id: createdCustomerId, userId });
        }
        if (server) {
            await new Promise((resolve, reject) => {
                server.close((error) => error ? reject(error) : resolve());
            });
        }
        await mongoose.disconnect();
    }
});
