import { Locator, Page } from '@playwright/test';

export class Menu {
    page: Page;

    someLocator: Locator;

    constructor(page: Page) {
        this.page = page;

        this.someLocator = page.locator('some locator');
    }
}
