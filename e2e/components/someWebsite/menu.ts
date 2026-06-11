import { Locator, Page } from '@playwright/test';

import { BaseComponent } from 'e2e/components/baseComponent';

type MenuSelectors = {
    someSelector: Locator;
};

export class Menu extends BaseComponent<MenuSelectors> {
    constructor(page: Page) {
        super(page);

        this.selectors = {
            someSelector: page.getByRole('menuitem', { name: 'Some Menu Item' }),
        };
    }
}
