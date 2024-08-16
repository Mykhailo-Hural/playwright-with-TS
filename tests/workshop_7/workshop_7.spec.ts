import { test, expect } from '@playwright/test';

const selectors = {
  firstName: '#firstName',
  age: '#age',
  isStudent: '#isStudent',
};

test.describe('Variable Declarations and Types', () => {
  test('Declaration and Types', async ({ page }) => {
    let firstName: string = 'John';
    let age: number = 30;
    let isStudent: boolean = false;

    await page.goto('file://' + __dirname + '/index.html');

    await page.fill(selectors.firstName, firstName);
    await page.fill(selectors.age, age.toString());

    if (!isStudent) {
      await page.uncheck(selectors.isStudent);
    }

    await page.click('#applyData');

    await expect(page.locator('#displayFirstName')).toHaveText(firstName);
    await expect(page.locator('#displayAge')).toHaveText(age.toString());

    await expect(page.locator('#displayIsStudent')).toHaveText('No');
  });
});
test.describe('Type Definitions adn Inference', () => {
  test('Type Def and Interfaces', async ({ page }) => {
    type User = {
      firstName: string;
      age: number;
      isStudent: boolean;
    };

    let user: User = {
      firstName: 'John',
      age: 30,
      isStudent: false,
    };
    await page.goto('file://' + __dirname + '/index.html');

    await page.fill(selectors.firstName, user.firstName);
    await page.fill(selectors.age, user.age.toString());
    await page.click('#applyData');

    await expect(page.locator('#displayFirstName')).toHaveText(user.firstName);
    await expect(page.locator('#displayAge')).toHaveText(user.age.toString());

    const isStudentChecked = await page.isChecked(selectors.isStudent);
    await expect(isStudentChecked).toBe(user.isStudent);
  });
});
