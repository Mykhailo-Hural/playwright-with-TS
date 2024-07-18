import { test, expect } from '@playwright/test';

test('Handling alert', async ({ page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  let alertMessage = '';
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toBe('alert');
    alertMessage = await dialog.message();
    await dialog.accept();
  });

  await page.click('button#show-alert');
  await expect(alertMessage).toBe('This is a simple alert.');
});

test('Confirm Alert', async ({ page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  let alertMessage = '';

  page.on('dialog', async (dialog) => {
    alertMessage = await dialog.message();
    await dialog.dismiss();
  });
  await page.click('button#show-confirm');
  await expect(alertMessage).toBe('You clicked Cancel.');
});

test('Handling Pop-ups', async ({ page }) => {
  await page.goto('file://' + __dirname + '/index.html');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.click('button#open-popup'),
  ]);

  await popup.waitForLoadState();

  await popup.close();
});
