import { test, expect } from '@playwright/test';

test('add item to cart and inspect network request', async ({ page }) => {
  // Navigate to a product detail page
  await page.goto('http://localhost:3000/product/1');

  // Wait for the page to load and the add to cart button to be visible
  await page.waitForSelector('button:has-text("Add to Cart")');

  // Intercept the cart item addition request
  const [request] = await Promise.all([
    page.waitForRequest(request => request.url().includes('/api/v1/cart/items') && request.method() === 'POST'),
    page.locator('button:has-text("Add to Cart")').click()
  ]);

  // Get the request payload
  const requestBody = request.postDataJSON();
  console.log('Add to Cart Request Payload:', requestBody);

  // Get the response from the cart service
  const response = await request.response();
  const responseBody = await response?.json();
  console.log('Add to Cart Response Body:', responseBody);

  // You can add assertions here if needed, e.g., expect(response.status()).toBe(200);
  expect(response?.status()).toBe(200);

  // Optionally, capture console logs during the process
  page.on('console', msg => console.log(`Browser Console: ${msg.text()}`));
});
