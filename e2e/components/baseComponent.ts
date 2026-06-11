import { Locator, Page } from '@playwright/test';

export class BaseComponent<TSelectors extends Record<string, Locator> = Record<string, Locator>> {
    page: Page;
    selectors: TSelectors;

    constructor(page: Page) {
        this.page = page;
        this.selectors = {} as TSelectors;
    }
}
