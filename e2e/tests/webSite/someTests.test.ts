import { expect, test } from 'fixtures/fixtures';

test('[testID] Login and verify element', async function ({ browserAgent1 }) {
    await test.step('Login', async () => {
        await browserAgent1.webPages.loginPage.login();
    });

    await test.step('Test', async () => {
        await expect(browserAgent1.webComponents.menu.selectors.someSelector).toBeEnabled();
    });
});

test('[testID] Two-browser cross-agent interaction', async function ({ browserAgent1, browserAgent2 }) {
    await test.step('Agent 1 logs in', async () => {
        await browserAgent1.webPages.loginPage.login();
    });

    await test.step('Agent 2 logs in independently', async () => {
        await browserAgent2.webPages.loginPage.login();
    });

    await test.step('Agent 1 performs action', async () => {
        // e.g. await browserAgent1.webComponents.menu.selectors.someSelector.click();
    });

    await test.step('Agent 2 observes result', async () => {
        // e.g. await expect(browserAgent2.webComponents.menu.selectors.someSelector).toBeVisible();
    });
});
