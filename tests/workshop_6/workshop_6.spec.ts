import { test, expect } from '@playwright/test';

const testData = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  number: '0987654321',
};

test.describe('User registration tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file://' + __dirname + '/index.html');
  });

  test('Registering with valid data', async ({ page }) => {
    await page.fill('#firstName', testData.firstName);
    await page.fill('#lastName', testData.lastName);
    await page.fill('#address', testData.address);
    await page.fill('#number', testData.number);
    await page.click('#register');

    const firstNameText = await page.locator('#displayFirstName').textContent();
    const lastNameText = await page.locator('#displayLastName').textContent();
    const addressText = await page.locator('#displayAddress').textContent();
    const numberText = await page.locator('#displayNumber').textContent();
    await page.waitForTimeout(5000);

    await expect(firstNameText).toBe(testData.firstName);
    await expect(lastNameText).toBe(testData.lastName);
    await expect(addressText).toBe(testData.address);
    await expect(numberText).toBe(testData.number);
  });

  test('Register with empty fields', async ({ page }) => {
    await page.click('#register');

    const errorSection = await page.locator('#error');
    await expect(errorSection).toBeVisible();
  });
});