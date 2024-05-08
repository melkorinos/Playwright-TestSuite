import { Locator, Page } from '@playwright/test';

export class BasePage {
    page: Page;

    mainLocator!: Locator;

    constructor(page: Page, mainLocator?: Locator) {
        this.page = page;

        if (mainLocator) this.mainLocator = page.locator('some locator');
    }
}
