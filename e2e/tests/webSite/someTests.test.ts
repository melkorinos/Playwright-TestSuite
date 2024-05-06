import { test, expect } from 'fixtures/fixtures';
import { getUrl } from 'config/configHelper';

test('[someID] Router Configuration - Hunt timeout setting', async function ({webComponents, webPages  }) {
    await test.step('Login ', async () => {
        await webPages.loginPage.login('username', getUrl() + 'portal');
    });

    await test.step('Сheck ', async () => {
        await expect(webComponents.menu.menuButton).toBeVisible();
    });
});
