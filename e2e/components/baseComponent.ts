import { Locator, Page } from '@playwright/test';

export class BaseComponent {
    page: Page;
    selectors: { [key: string]: Locator };

    constructor(page: Page) {
        this.page = page;
        this.selectors = {};
    }
}
