import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const localChromeExecutable = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const localBrowser = existsSync(localChromeExecutable)
  ? { launchOptions: { executablePath: localChromeExecutable } }
  : undefined;
const useExistingServer = process.env.PLAYWRIGHT_USE_EXISTING_SERVER === "true";

export default defineConfig({
  testDir: "./src/tests/e2e",
  use: { baseURL: "http://127.0.0.1:3000" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], ...localBrowser } }],
  webServer: useExistingServer
    ? undefined
    : {
        command: "node ./node_modules/next/dist/bin/next start --hostname 127.0.0.1",
        url: "http://127.0.0.1:3000",
        timeout: 30_000,
        reuseExistingServer: !process.env.CI,
      },
});
