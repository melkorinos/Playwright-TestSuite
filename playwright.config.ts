import { devices, type PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { getUrl } from 'config/configHelper';

dotenv.config();

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'e2e', // for e2e tests in test environments
            use: {
                baseURL: getUrl(),
                channel: 'chrome',
                ...devices['Desktop Chrome'],
                actionTimeout: 45_000,
                navigationTimeout: 40_000,
                ignoreHTTPSErrors: true,
                permissions: ['camera', 'microphone', 'notifications'],
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                trace: 'retain-on-failure',
            },
            testDir: 'e2e/tests/',
            expect: {
                timeout: 30_000,
            },
        },

        {
            name: 'api', // for api tests in test environments
            use: {
                browserName: 'chromium',
                headless: true,
            },
            testDir: 'api/tests/',
        },

        { name: 'apiUtils', testDir: 'api/utils/', testMatch: '**/*.utils.ts' },
    ],
    outputDir: 'temp/test-results',
    reporter: process.env.CI
        ? [
              ['list'],
              ['junit', { outputFile: 'temp/reports/results.xml' }],
              ['html', { outputFolder: 'temp/playwright-report', open: 'never' }],
          ]
        : [['list'], ['html', { outputFolder: 'temp/playwright-report' }]],
    reportSlowTests: null,
    timeout: 300_000,
    retries: process.env.CI ? 2 : 0,
};

export default config;
