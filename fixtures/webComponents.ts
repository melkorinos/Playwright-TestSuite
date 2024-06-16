import { test as base } from '@playwright/test';
import { Menu } from 'e2e/components/someWebsite';

export type WebComponents = {
    webComponents: {
        menu: Menu;
    };
};

export const test = base.extend<WebComponents>({
    webComponents: async ({ page }, use) => {
        const webComponents = {
            menu: new Menu(page),
        };
        await use(webComponents);
    },
});
