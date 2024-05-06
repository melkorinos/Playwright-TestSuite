import { Locator, Page } from '@playwright/test';

export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(url: string) {
        await this.page.goto(url);
    }
}
