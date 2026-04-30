import { expect, test } from 'fixtures/fixtures';

import { IResponseModel } from 'api/models/someService';
import { getWorkerSlot } from 'config/configHelper';

// Group related tests for the same endpoint under a describe block.
// Each test covers a distinct behaviour — GET validation and POST integration.
test.describe('Some Service', () => {
    test.beforeAll(() => {
        // Validate that the worker slot for this parallel worker is correctly resolved.
        // This confirms the config → workerSlots wiring is intact before any test runs.
        const slot = getWorkerSlot();
        expect(slot).toBeDefined();
        expect(typeof slot.someKey).toBe('string');
        console.log(`Worker slot resolved: ${JSON.stringify(slot)}`);
    });
    
    test('[testID] Get endpoint - validates response and data', async function ({ servicesAgent1 }) {
        let responseData: IResponseModel;

        await test.step('Check response status', async () => {
            const response = await servicesAgent1.someService.getEndpoint();
            responseData = await response.json();
            expect(response.status(), { message: await response.text() }).toBe(200);
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

    test('[testID] Post endpoint - integration poll confirms state update', async function ({ servicesAgent1 }) {
        await test.step('Post data', async () => {
            await servicesAgent1.someService.postEndpoint('data');
        });

        await test.step('Poll GET to confirm update', async () => {
            await expect
                .poll(async () => {
                    const response = await servicesAgent1.someService.getEndpoint();
                    return response.status();
                })
                .toBe(200);
        });
    });
});
