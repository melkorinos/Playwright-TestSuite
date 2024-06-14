import { expect, test } from 'fixtures/fixtures';

test('[testID] Some Service - Check something', async function ({ services }) {
    await test.step('Check something', async () => {
        const response = await services.someService.getEndpoint();
        expect(response).toBeOK();
    });

    await test.step('Use customer matchers', async () => {
        expect('string').not.toBeHello();
    });
});
