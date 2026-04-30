import { expect, test } from 'fixtures/fixtures';

import { getUrl } from 'config/configHelper';

test.describe('Browser agents', () => {
    test('[testID] Single agent - navigates to base URL', async function ({ browserAgent1 }) {
        await test.step('Navigate to base URL', async () => {
            await browserAgent1.webPages.loginPage.goTo(getUrl());
        });

        await test.step('Confirm correct URL loaded', async () => {
            await expect(browserAgent1.webPages.loginPage.page).toHaveURL(getUrl());
        });
    });

    test('[testID] Dual agent - both browsers navigate independently to base URL', async function ({ browserAgent1, browserAgent2 }) {
        await test.step('Agent 1 navigates to base URL', async () => {
            await browserAgent1.webPages.loginPage.goTo(getUrl());
        });

        await test.step('Agent 2 navigates to base URL independently', async () => {
            await browserAgent2.webPages.loginPage.goTo(getUrl());
        });

        await test.step('Both agents are on the correct URL', async () => {
            await expect(browserAgent1.webPages.loginPage.page).toHaveURL(getUrl());
            await expect(browserAgent2.webPages.loginPage.page).toHaveURL(getUrl());
        });
    });
});
