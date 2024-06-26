import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';

export class LoginPage extends BasePage {
    username: Locator;

    constructor(page: Page) {
        super(page);

        this.username = page.locator('username');
    }

    async login() {
        await this.goTo();
        await this.username.fill('username');
    }
}
