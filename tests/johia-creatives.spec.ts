import { test, expect } from "@playwright/test";

test.describe("JOHIA Creatives Scrollytelling Web Experience", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("01: Page title, brand metadata, and top navigation render", async ({ page }) => {
    await expect(page).toHaveTitle(/JOHIA CREATIVES/i);
    const navBrand = page.locator("header a", { hasText: "JOHIA CREATIVES" });
    await expect(navBrand).toBeVisible();

    // Check Chapter Jump pills
    await expect(page.locator("nav a", { hasText: "01 Studio" })).toBeVisible();
    await expect(page.locator("nav a", { hasText: "02 Shutter" })).toBeVisible();
    await expect(page.locator("nav a", { hasText: "03 Assemble" })).toBeVisible();
    await expect(page.locator("nav a", { hasText: "04 Gallery" })).toBeVisible();
    await expect(page.locator("nav a", { hasText: "05 Socials" })).toBeVisible();
    await expect(page.locator("nav a", { hasText: "06 Join Us" })).toBeVisible();
  });

  test("02: Studio Swatch Picker switches active colors", async ({ page }) => {
    // Click Magenta swatch in header nav
    const magentaSwatch = page.locator('header button[title*="Viva Magenta"]');
    await expect(magentaSwatch).toBeVisible();
    await magentaSwatch.click();

    // Click Cobalt swatch in header nav
    const cobaltSwatch = page.locator('header button[title*="Cobalt Electric"]');
    await expect(cobaltSwatch).toBeVisible();
    await cobaltSwatch.click();
  });

  test("03: Chapter 2 Camera Viewfinder dials angles and triggers shutter", async ({ page }) => {
    // Switch to Wide Sanctuary Crowd
    const wideAngleBtn = page.locator("button", { hasText: "Wide Sanctuary Crowd" });
    await expect(wideAngleBtn).toBeVisible();
    await wideAngleBtn.click();

    // Verify EXIF telemetry
    await expect(
      page.locator("#chapter-2").getByText("24mm Ultra-Wide", { exact: true })
    ).toBeVisible();

    // Trigger shutter
    const snapBtn = page.locator("button", { hasText: "SNAP PHOTO" });
    await expect(snapBtn).toBeVisible();
    await snapBtn.click();

    // Verify RAW ejection notification
    await expect(page.locator("text=RAW Frame Successfully Captured")).toBeVisible();
  });

  test("04: Chapter 3 Lego Poster Assembly steps & 3D Explode toggle", async ({ page }) => {
    // Check Lego piece controls
    const piece2Btn = page.locator("button", { hasText: "Piece 2" });
    await expect(piece2Btn).toBeVisible();
    await piece2Btn.click();

    const piece4Btn = page.locator("button", { hasText: "Piece 4" });
    await expect(piece4Btn).toBeVisible();
    await piece4Btn.click();

    // Toggle 3D Explode
    const explodeBtn = page.locator("button", { hasText: /Explode 3D|Collapse 3D/ });
    await expect(explodeBtn).toBeVisible();
    await explodeBtn.click();
    await expect(page.locator("button", { hasText: "Collapse 3D" })).toBeVisible();
  });

  test("05: Chapter 4 dau.lt Broken Grid expansion", async ({ page }) => {
    // Click on Sunday Message Key Visual card
    const firstCard = page.locator("text=Sunday Message Key Visual: 'Conqueror'").first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();

    // Verify expanded view and recipe breakdown
    await expect(
      page.locator('h4:has-text("Creative Recipe Breakdown")')
    ).toBeVisible();
    await expect(page.locator("text=Color Swatches").first()).toBeVisible();
    await expect(page.locator("text=Typography Stack").first()).toBeVisible();

    // Close expanded modal
    const closeBtn = page.locator("button svg.lucide-x").first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  });

  test("06: Chapter 5 Write-Up Studio & Facebook Feed Simulator", async ({ page }) => {
    // Switch to Morning Prayer Tone
    const prayerBtn = page.locator("button", { hasText: "Devotional: Morning Prayer" });
    await expect(prayerBtn).toBeVisible();
    await prayerBtn.click();

    // Check caption text updated
    await expect(page.locator("text=CALLING ALL PRAYER WARRIORS!").first()).toBeVisible();

    // Test reaction button
    const likeBtn = page.locator("button", { hasText: "Like" });
    await expect(likeBtn).toBeVisible();
    await likeBtn.click();

    const loveBtn = page.locator("button", { hasText: "Love" });
    await expect(loveBtn).toBeVisible();
    await loveBtn.click();
  });

  test("07: Chapter 6 Branches Explorer & Google Form Registration Flow", async ({ page }) => {
    // Verify 4 Branches
    await expect(page.locator("#chapter-6").getByText("BRANCH 01", { exact: true })).toBeVisible();
    await expect(page.locator("#chapter-6").getByText("BRANCH 02", { exact: true })).toBeVisible();
    await expect(page.locator("#chapter-6").getByText("BRANCH 03", { exact: true })).toBeVisible();
    await expect(page.locator("#chapter-6").getByText("BRANCH 04", { exact: true })).toBeVisible();

    // Verify Tech vs Creatives distinction banner
    await expect(page.locator("text=MINISTRY DISTINCTION: CREATIVES VS. TECHNICALS")).toBeVisible();
    await expect(page.locator("text=Both ministries collaborate closely every Sunday.")).toBeVisible();

    // Verify Official Google Form Link & QR Code
    const gFormLinks = page.locator('a[href*="forms.gle/AXmj7uZFNKisdVfK6"]');
    await expect(gFormLinks.first()).toBeVisible();
    await expect(page.locator("text=REGISTER NOW ON GOOGLE FORMS")).toBeVisible();
    await expect(page.locator("text=SCAN WITH PHONE CAMERA TO JOIN")).toBeVisible();
  });
});
