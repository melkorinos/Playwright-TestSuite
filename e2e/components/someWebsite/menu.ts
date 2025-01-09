import { Page } from '@playwright/test';
import { BaseComponent } from 'e2e/components/baseComponent';

export class Menu extends BaseComponent {
    constructor(page: Page) {
        super(page);

        this.selectors = {
            someSelector: page.locator('someSelector'),
        };
    }
}
