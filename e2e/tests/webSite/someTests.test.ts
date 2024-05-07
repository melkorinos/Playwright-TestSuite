import { test, expect } from 'fixtures/fixtures';

test('[someID] Login and verify element', async function ({ webComponents, webPages }) {
    await test.step('Login ', async () => {
        await webPages.loginPage.login();
    });

    await test.step('Сheck breeds are visible', async () => {
        await expect(webComponents.menu.breeds).toBeVisible();
    });
});
