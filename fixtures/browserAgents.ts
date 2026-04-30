import { LoginPage } from 'e2e/components/someWebsite';
import { Menu } from 'e2e/components/someWebsite';
import { test as base } from '@playwright/test';

/**
 * BrowserAgent groups all page objects for a single browser session.
 * - webPages:     full-page objects (own navigation via goTo)
 * - webComponents: significant sub-components within pages
 *
 * The grouping is organisational — there is no behavioural difference.
 */
export type BrowserAgent = {
    webPages: {
        loginPage: LoginPage;
    };
    webComponents: {
        menu: Menu;
    };
};

export type BrowserAgentFixtures = {
    browserAgent1: BrowserAgent;
    browserAgent2: BrowserAgent;
};

function assembleBrowserAgent(page: import('@playwright/test').Page): BrowserAgent {
    return {
        webPages: {
            loginPage: new LoginPage(page),
        },
        webComponents: {
            menu: new Menu(page),
        },
    };
}

export const test = base.extend<BrowserAgentFixtures>({
    /**
     * browserAgent1 wraps the built-in `page` fixture.
     * It inherits all project-level config (baseURL, timeouts, channel, viewport, etc.)
     * from playwright.config.ts with no extra overhead.
     * Use this for any test that needs exactly one browser.
     */
    browserAgent1: async ({ page }, use) => {
        await use(assembleBrowserAgent(page));
        // page lifecycle is managed by Playwright — no manual cleanup needed
    },

    /**
     * browserAgent2 launches a fully independent browser process via the `playwright` fixture.
     * This ensures true isolation — no shared browser state with browserAgent1.
     * Use this in addition to browserAgent1 when a test needs two simultaneous browsers
     * (e.g. agentA performs an action, agentB observes the result in their own session).
     *
     * Config options that cannot be inherited from playwright.config.ts when launching
     * manually are applied explicitly below — keep this in sync with the project config.
     */
    browserAgent2: async ({ playwright, baseURL }, use) => {
        const browser = await playwright.chromium.launch({ channel: 'chrome' });
        const context = await browser.newContext({
            baseURL: baseURL,
            ignoreHTTPSErrors: true,
        });
        const page = await context.newPage();

        await use(assembleBrowserAgent(page));

        await browser.close(); // also disposes context and page
    },
});
