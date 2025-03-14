import { test, expect, BrowserFixtures } from 'fixtures/fixtures';
import { getNewBrowser } from 'helpers/browserHelper';

let userB: BrowserFixtures;

test('[testID] Login and verify element', async function ({ webComponents, webPages, browser }) {
    await test.step('Login', async () => {
        await webPages.loginPage.login();
    });

    await test.step('Test', async () => {
        await expect(webComponents.menu.selectors.someSelector).toBeEnabled();
    });

    await test.step('Login another user', async () => {
        userB = await getNewBrowser(browser);
        await userB.webPages.loginPage.login();
    });
});
