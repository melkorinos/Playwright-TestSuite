import { Browser } from '@playwright/test';
import { BrowserFixtures } from 'fixtures/fixtures';

import { LoginPage, Menu } from '../components/someWebsite';

export async function getNewBrowser(browser: Browser): Promise<BrowserFixtures> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const webPages = {
        loginPage: new LoginPage(page),
    };

    const components = {
        menu: new Menu(page),
    };

    return {
        components,
        webPages,
    };
}
