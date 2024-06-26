import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { AzureReporterOptions } from '@alex_neo/playwright-azure-reporter/dist/playwright-azure-reporter';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
    name: 'automation-tests',
    projects: [
        {
            name: 'e2e', // for e2e tests in test environments
            use: {
                channel: 'chrome',
                browserName: 'chromium',
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
                channel: 'chrome',
                browserName: 'chromium',
            },
            testDir: 'api/tests/',
        },
    ],
    reporter: process.env.CI
        ? [
              //if this is a CI run
              ['list'],
              ['junit', { outputFile: 'reports/results.xml' }],
              ['html', { open: 'never' }],
              [
                  '@alex_neo/playwright-azure-reporter',
                  {
                      orgUrl: 'https://dev.azure.com/someorg/',
                      token: process.env.SYSTEM_ACCESSTOKEN, //this is the azure devops token passed from the pipeline.yaml
                      planId: 11111, //this is the id of the test plan in azure devops
                      projectName: 'someProject', //this is the name of the project in azure devops
                      environment: 'QA',
                      logging: true,
                      testRunTitle: 'API Test Run Title',
                      publishTestResultsMode: 'testRun',
                      uploadAttachments: true,
                      attachmentsType: ['screenshot', 'video', 'trace'],
                      testRunConfig: {
                          owner: {
                              displayName: process.env.BUILDQUEUEDBY, //must be a valid azure devops user
                          },
                          comment: 'Playwright Test Run',
                          configurationIds: [Number(process.env.CONFIG_ID)], // from https://dev.azure.com/someorg/configurations
                      },
                  } as AzureReporterOptions,
              ],
          ]
        : [['list'], ['html']], //if this is NOT a CI run serve the standard playwright reports

    reportSlowTests: null,
    timeout: 300_000,
};

export default config;
