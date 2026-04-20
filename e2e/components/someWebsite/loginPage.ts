import { Locator, Page } from '@playwright/test';

import { BasePage } from '../basePage';

type LoginPageSelectors = {
    username: Locator;
};

export class LoginPage extends BasePage<LoginPageSelectors> {
    constructor(page: Page) {
        super(page);

        this.selectors = {
            username: page.getByLabel('Username'),
        };
    }

    async login() {
        await this.goTo('/');
        await this.selectors.username.fill('username');
    }
}
