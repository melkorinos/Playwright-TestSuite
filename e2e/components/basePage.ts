import { Locator, Page } from '@playwright/test';

export class BasePage {
    page: Page;
    selectors: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;

        this.selectors = {};
    }

    async goTo(url : string) {
        await this.page.goto(url);
    }
}
