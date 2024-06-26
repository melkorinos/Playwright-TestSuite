import { Locator, Page } from '@playwright/test';
import { BaseComponent } from 'e2e/components/baseComponent';

export class Menu extends BaseComponent {
    someLocator: Locator;

    constructor(page: Page) {
        super(page);

        this.someLocator = page.locator('some locator');
    }
}
