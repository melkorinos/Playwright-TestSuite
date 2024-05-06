import { test as base } from '@playwright/test';

import { SomeService } from 'api/services';

export type Services = {
    services: {
        someService: SomeService;
    };
};

export const test = base.extend<Services>({
    services: async ({}, use) => {
        const someService = await SomeService.instance('no token needed to get token');
        const token = await someService.getToken();

        const services = {
            someService: await SomeService.instance(token),
        };
        await use(services);
    },
});
