import { devices, type PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'e2e', // for e2e tests in test environments
            use: {
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
    ],
    reporter: process.env.CI
        ? [['list'], ['junit', { outputFile: 'reports/results.xml' }], ['html', { open: 'never' }]]
        : [['list'], ['html']],
    reportSlowTests: null,
    timeout: 300_000,
    retries: process.env.CI ? 2 : 0,
};

export default config;
