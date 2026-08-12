import { spawn } from "node:child_process";

const baseUrl = "http://127.0.0.1:3000";
const server = spawn(
  process.execPath,
  ["./node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1"],
  { stdio: "inherit", windowsHide: true },
);

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/en`);
      if (response.ok) return;
    } catch {
      // The server is expected to refuse connections until Next has started.
    }

    await wait(250);
  }

  throw new Error("Playwright test server did not become ready within 30 seconds.");
}

function stopServer() {
  if (!server.killed) server.kill();
}

try {
  await waitForServer();

  const playwright = spawn(process.execPath, ["./node_modules/@playwright/test/cli.js", "test"], {
    stdio: "inherit",
    windowsHide: true,
    env: { ...process.env, PLAYWRIGHT_USE_EXISTING_SERVER: "true" },
  });

  const exitCode = await new Promise((resolve, reject) => {
    playwright.once("error", reject);
    playwright.once("exit", (code) => resolve(code ?? 1));
  });

  process.exitCode = exitCode;
} finally {
  stopServer();
}
