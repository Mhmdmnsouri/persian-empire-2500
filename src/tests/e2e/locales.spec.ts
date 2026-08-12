import { expect, test } from "@playwright/test";

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
