import { test, expect } from 'fixtures/fixtures';
import { getUrl } from 'config/configHelper';

test('[someID] Router Configuration - Hunt timeout setting', async function ({ components, webPages }) {
    await test.step('Login ', async () => {
        await webPages.loginPage.login('username', 'pass', getUrl() + 'portal');
    });

    await test.step('Сheck ', async () => {
        await expect(components.menu.menuButton).toBeVisible();
    });
});
