import { test } from 'playwright/test';

test('Basic Navigation', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
});

test('Interaction with the Web Element on Gitlab', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    // Corrected line below
    await page.locator('.be-nav-navigation-bottom >> text="Get free trial"').click();
});