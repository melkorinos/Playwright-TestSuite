import * as customMatchers from '../helpers/customMatchers';

import { BrowserAgent, BrowserAgentFixtures, test as browserAgents } from './browserAgents';
import { ServiceFixtures, test as services } from './services';

import { expect as baseExpect } from '@playwright/test';
import { mergeTests } from '@playwright/test';

/**
 * BrowserFixtures represents a fully assembled browser session for one agent.
 * Use this type when passing a browser agent between helpers or utilities.
 */
export type BrowserFixtures = BrowserAgent;

/**
 * Re-exported for tests that need to reference agent types directly
 */
export type { AgentServices } from './services';
export type { ServiceFixtures, BrowserAgentFixtures, BrowserAgent };

/**
 * Combine all fixture groups into the single test object.
 * Playwright initialises each fixture lazily — API-only tests that never
 * reference browserAgent1/browserAgent2 will not spawn a browser process.
 */
const test = mergeTests(browserAgents, services);


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
