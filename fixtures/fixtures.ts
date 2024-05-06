import { mergeTests } from '@playwright/test';

import { WebComponents, test as webComponents } from './webComponents';

import { WebPages, test as webPages } from './webPages';
import { test as services } from './services';

/**
 * This type is used for additional users in new browsers
 */
export type BrowserFixtures = WebPages & WebComponents;

export const test = mergeTests(webPages, webComponents, services);

export { expect } from '@playwright/test';
