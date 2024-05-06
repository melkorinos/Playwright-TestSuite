import { mergeTests } from '@playwright/test';

import { WebComponents, test as finalWebComponents } from './webComponents';

import { WebPages, test as finalWebPages } from './webPages';
import { test as services } from './services';

/**
 * This type is used for additional users in new browsers
 */
export type BrowserFixtures = WebPages & WebComponents;

export const test = mergeTests(finalWebPages, finalWebComponents, services);

export { expect } from '@playwright/test';
