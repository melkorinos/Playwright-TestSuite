import { Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { getUrl } from 'config/configHelper';

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page);

        this.selectors = {
            username: page.locator('username'),
        };
    }

    async login() {
        await this.goTo(getUrl());
        await this.selectors.username.fill('username');
    }
}
