import { test as base } from '@playwright/test';
import { LoginPage } from 'e2e/components/someWebsite';

export type WebPages = {
    webPages: {
        loginPage: LoginPage;
    };
};

export const test = base.extend<WebPages>({
    webPages: async ({ page }, use) => {
        const webPages = {
            loginPage: new LoginPage(page),
        };
        await use(webPages);
    },
});
