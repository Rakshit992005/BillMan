import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

const PORT = process.env.PORT || 5000;
const requiredEnvironment = [
    "MONGO_URI",
    "JWT_SECRET",
    "IMAGEKIT_PRIVATE_KEY",
    "IMAGEKIT_PUBLIC_KEY",
    "IMAGEKIT_URL_ENDPOINT",
];

const startServer = async () => {
    const missing = requiredEnvironment.filter((name) => !process.env[name]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});

