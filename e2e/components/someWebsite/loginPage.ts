import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { getUrl } from 'config/configHelper';

export class LoginPage extends BasePage {
    somelocator: Locator;

    constructor(page: Page) {
        super(page);

        this.somelocator = page.locator('some locator');
    }

    async login() {
        await this.page.goto(getUrl());
    }
}
