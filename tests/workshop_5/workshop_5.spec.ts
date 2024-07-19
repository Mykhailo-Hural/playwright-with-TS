import { test, expect } from '@playwright/test';

test.only('Open new window and navigate back', async ({ context, page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  // Fix typo: "waiForEvent" should be "waitForEvent"
  const pagePromise = context.waitForEvent('page');
  await page.click('button#openNewWindow');

  const newPage = await pagePromise;
  await newPage.waitForLoadState();
  console.log(await newPage.title());
  // Use the correct method for locating elements by role
  await expect(
    newPage.locator('role=heading[name="Welcome to the New Page"]')
  ).toBeVisible();
});
