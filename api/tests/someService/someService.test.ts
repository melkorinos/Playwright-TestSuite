import { expect, test } from 'fixtures/fixtures';

import { IResponseModel } from 'api/models/someService';

// Group related tests for the same endpoint under a describe block.
// Each test covers a distinct behaviour — GET validation and POST integration.
test.describe('Some Service', () => {
    test('[testID] Get endpoint - validates response and data', async function ({ services }) {
        let responseData: IResponseModel;

        await test.step('Check response status', async () => {
            const response = await services.someService.getEndpoint();
            responseData = await response.json();
            expect(response.status(), { message: await response.text() }).toBeOK();
        });

        await test.step('Check there is a cat fact', async () => {
            for (const fact of responseData.data) {
                expect(fact.fact.toLocaleLowerCase()).toContain('cat');
            }
        });

        await test.step('Use custom matchers', async () => {
            expect('string').not.toBeHello();
        });
    });

    test('[testID] Post endpoint - integration poll confirms state update', async function ({ services }) {
        await test.step('Post data', async () => {
            await services.someService.postEndpoint('data');
        });

        await test.step('Poll GET to confirm update', async () => {
            await expect
                .poll(async () => {
                    const response = await services.someService.getEndpoint();
                    return response.status();
                })
                .toBe(200);
        });
    });
});
