import { expect, test } from "@playwright/test";

const englishStationSequence = [
  ["intro", "Introduction"],
  ["grand-stairway", "Grand Stairway"],
  ["lamassu", "Guardian figures"],
  ["bull-capital", "Bull Capital"],
  ["outro", "Conclusion"],
] as const;

for (const locale of ["en", "fa"] as const) {
  test(`@smoke ${locale} route renders the story shell`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".locale-root")).toHaveAttribute(
      "dir",
      locale === "fa" ? "rtl" : "ltr",
    );
    const skipIntro = page.locator('a[href="#station-grand-stairway"]');
    await expect(skipIntro).toHaveAttribute("href", "#station-grand-stairway");
    await skipIntro.focus();
    await expect(skipIntro).toBeFocused();
  });
}

test("@journey completes forward, reverses to the intro, and restarts", async ({ page }) => {
  await page.goto("/en");
  const progress = page.getByRole("status");

  for (const [stationId, title] of englishStationSequence) {
    await page.locator(`[data-station="${stationId}"]`).scrollIntoViewIfNeeded();
    await expect(progress).toContainText(title);
  }

  await page.getByRole("button", { name: "Restart journey" }).click();
  await expect(progress).toContainText("Introduction");
  await page.locator('[data-station="intro"]').scrollIntoViewIfNeeded();
  await expect(progress).toContainText("Introduction");
});

test("@journey restores the active station after refresh at midpoint", async ({ page }) => {
  await page.goto("/en");
  await page.locator('[data-station="lamassu"]').scrollIntoViewIfNeeded();
  await expect(page.getByRole("status")).toContainText("Guardian figures");
  await page.reload();
  await expect(page.getByRole("status")).toContainText("Guardian figures");
});
