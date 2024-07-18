import { test, expect } from '@playwright/test';

test('Advance Interaction', async ({ page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  // Hover over the element with the text "Hover me"
  await page.hover('#hover-me');
  // Wait for the text "Text Changed!" to be visible on the page with an explicit timeout
  await expect(page.locator('text=Text Changed!')).toBeVisible({
    timeout: 5000,
  });
  // Optionally, wait for a specific timeout if needed (e.g., to observe the change during the test)
  await page.waitForTimeout(1000);

  await page.click('button#context-menu', { button: 'right' });
  await expect(page.locator('text=Context Menu Appears')).toBeVisible();

  await page.dblclick('button#double-click');
  expect(await page.locator('img').count()).toBe(1);
});

test('Drag and Drop', async ({ page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  await page.dragAndDrop('.drag-source', '.drop-target');
  // Corrected assertion to properly use Playwright's expect API
  await expect(page.locator('.drop-target')).toContainText('Success');
});

test('Handling iframe', async ({ page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  const iframeElement = await page.frame({ name: 'iframeName' });
  const inputSelector = '#iframe-input';

  if (iframeElement) {
    await iframeElement.type(inputSelector, 'Hello, World!');
    await page.waitForTimeout(1000);
    await expect(iframeElement.locator(inputSelector)).toHaveValue(
      'Hello, World!'
    );
  } else {
    console.error('Iframe is not available');
  }
});
