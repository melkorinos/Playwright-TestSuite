import { test as utils } from 'fixtures/fixtures';

utils('Setup or check something', async function ({ services }) {
    await utils('Check/setup something', async () => {
        const response = await services.someService.getEndpoint();
        const data = await response.json();

        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value}`);
        }
    });
});
