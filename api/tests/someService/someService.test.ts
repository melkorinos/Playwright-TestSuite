import { expect, test } from 'fixtures/fixtures';
import { IResponseModel } from 'api/models/someService';

test('[testID] Some Service - Check something', async function ({ services }) {
    let responseData: IResponseModel;

    await test.step('Check response', async () => {
        const response = await services.someService.getEndpoint();
        responseData = await response.json();
        await expect(response).toBeOK();
    });

    await test.step('Check there is a cat fact', async () => {
        for (const fact of responseData.data) {
            expect(fact.fact.toLocaleLowerCase()).toContain('cat');
        }
    });

    await test.step('Use customer matchers', async () => {
        expect('string').not.toBeHello();
    });

    await test.step('Integration test', async () => {
        await services.someService.postEndpoint('data');

        await expect
            .poll(async () => {
                const response = await services.someService.getEndpoint();
                return response.status();
            })
            .toBe(200);
    });
});
