import { Locator, Page } from '@playwright/test';

export class Menu {
    page: Page;

    breeds: Locator;

    constructor(page: Page) {
        this.page = page;

        this.breeds = page.locator('#operations-tag-Breeds');
    }
}
