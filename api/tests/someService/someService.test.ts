import { expect, test } from 'fixtures/fixtures';

test('[testID] Some Service - Check something', async function ({ services }) {
    await test.step('Check something', async () => {
        const response = await services.someService.getEndpoint();
        expect(response).toBeOK();
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

    //await test.step('Upload file', async () => {
    //    const filename = 'testImage.jpg';
    //    const response = await services.someService.uploadFile(filename);
    //    expect(response).toBeOK();
    //});
});
