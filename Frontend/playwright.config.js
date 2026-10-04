import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://localhost:5173",
    headless: true,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "npm start",
      cwd: "../Backend",
      url: "http://localhost:8000/ping",
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: "npm run dev -- --host localhost",
      cwd: ".",
      url: "http://localhost:5173/login",
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
});
