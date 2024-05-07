import { Locator, Page } from '@playwright/test';
import { getUrl } from 'config/configHelper';

export class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login() {
        await this.page.goto(getUrl());
    }
}
