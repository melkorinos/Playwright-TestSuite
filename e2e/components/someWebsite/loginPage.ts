import { Locator, Page } from '@playwright/test';

export class LoginPage {
    page: Page;

    breeds: Locator;

    constructor(page: Page) {
        this.page = page;

        this.breeds = page.locator('#operations-tag-Breeds');
    }

    async login(url: string) {
        await this.page.goto(url);
    }
}
