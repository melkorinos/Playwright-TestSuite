import * as customMatchers from '../helpers/customMatchers';

import { ServiceFixtures, test as services } from './services';
import { WebComponents, test as webComponents } from './webComponents';
import { WebPages, test as webPages } from './webPages';

import { expect as baseExpect } from '@playwright/test';
import { mergeTests } from '@playwright/test';

/**
 * This type is used for additional users in new browsers
 */
export type BrowserFixtures = WebPages & WebComponents;

/**
 * Re-exported for tests that need to reference agent service types directly
 */
export type { AgentServices } from './services';
export type { ServiceFixtures };

/**
 * Combine all test components in the test object
 */
const test = mergeTests(webPages, webComponents, services);


/**
 * Add custom matchers to expect object
 */
const expect = baseExpect.extend({
    toBeHello(received: string) {
        const pass = customMatchers.isHello(received);
        const message = pass ? () => `expected ${received} not to be hello` : () => `expected ${received} to be hello`;

        return {
            pass,
            message,
        };
    },
});

export { test, expect };
