import { Locator, Page } from '@playwright/test';
import { getUrl } from 'config/configHelper';

export class BasePage {
    page: Page;

    mainLocator!: Locator;

    constructor(page: Page, mainLocator?: Locator) {
        this.page = page;

        if (mainLocator) this.mainLocator = page.locator('some locator');
    }

    async goTo() {
        await this.page.goto(getUrl());
    }
}
