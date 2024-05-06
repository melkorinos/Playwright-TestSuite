import { Locator, Page } from '@playwright/test';

export class Menu {
    page: Page;

    menuButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menuButton = page.locator("a[href='/portal/menu']");
    }
}
