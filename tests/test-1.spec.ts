import { test, expect } from '@playwright/test';

test('My first test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.goto('http://localhost:3000/?layout=mix&splitMenus=true');
    await page.goto('http://localhost:3000/welcome');
    await page.goto('http://localhost:3000/welcome?layout=mix&splitMenus=true');
    await page.goto('http://localhost:3000/admin');
    await page.goto('http://localhost:3000/admin?layout=mix&splitMenus=true');
    await page.goto('http://localhost:3000/list');
    await page.goto('http://localhost:3000/list?layout=mix&splitMenus=true');
});