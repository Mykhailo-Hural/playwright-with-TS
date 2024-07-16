import { test, expect } from 'playwright/test';

test('Basic Navigation', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  const newTodo = await page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('John Dou');
  await newTodo.press('Enter');
  await newTodo.fill('JJ PP');
  await newTodo.press('Enter');
  await page.waitForTimeout(1000);

  const firstTodo = page.getByTestId('todo-item').nth(0);
  await firstTodo.getByRole('checkbox').check();
  await page.waitForTimeout(1000);

  const secondTodo = page.getByTestId('todo-item').nth(1);
  await expect(secondTodo).not.toHaveClass('completed');
  await expect(firstTodo).toHaveClass('completed');
  await secondTodo.getByRole('checkbox').check();
  await page.waitForTimeout(1000);
});

test('Handling From', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');
    const placeholder = await page.locator('[placeholder ="What needs to be done?"]');
    await placeholder.fill('John Doe');
    await placeholder.press('Enter');

    const checkbox = await page.locator('.toggle');
    await checkbox.click();

    await page.waitForTimeout(1000);
});
