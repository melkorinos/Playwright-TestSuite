import { test as utils } from 'fixtures/fixtures';

utils('Setup or check something', async function ({ servicesAgent1 }) {
    await utils('Check/setup something', async () => {
        const response = await servicesAgent1.someService.getEndpoint();
        const data = await response.json();

        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value}`);
        }
    });
});
