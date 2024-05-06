import { Locator, Page } from '@playwright/test';

export class LoginPage {
    page: Page;

    emailInput: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.getByPlaceholder('Email or phone');
    }

    async login(email: string, url: string) {
        await this.page.goto(url);
        await this.emailInput.fill(email);
    }
}
