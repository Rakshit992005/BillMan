import express from 'express'
import userRoutes from "../src/routes/user.routes.js"
import cookieParser from 'cookie-parser';
import customerRoutes from "../src/routes/customer.routes.js"
import invoiceRoutes from "../src/routes/invoice.routes.js"
import dashboardRoutes from "../src/routes/dashboard.routes.js"
import cors from 'cors'
import { securityHeaders, verifyRequestOrigin } from './middlewares/security.middleware.js';

const app = express();
const allowedOrigins = new Set([
    "https://bill-man.vercel.app",
    "http://localhost:5173"
]);

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(cors({
    origin: [...allowedOrigins],
    credentials: true
}));
app.use(verifyRequestOrigin(allowedOrigins));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use('/api/user' , userRoutes);

app.use('/api/customer' , customerRoutes);

app.use('/api/invoice' , invoiceRoutes );

app.use("/api/dashboard" , dashboardRoutes);

app.get("/ping", (req, res) => {
  res.status(200).send("OK");
});

app.use((error, req, res, next) => {
    if (error?.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({ message: "Only JPEG, PNG, GIF, and WebP images are allowed" });
    }

    if (error?.name === "MulterError" || error?.type === "entity.too.large") {
        return res.status(413).json({ message: "Request payload is too large" });
    }

    if (error?.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Malformed request body" });
    }

    if (error) {
        console.error("Unhandled request error", error);
        return res.status(500).json({ message: "Internal server error" });
    }

    return next();
});

export default app;
