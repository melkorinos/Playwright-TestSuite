import { SomeService, TokenService } from 'api/services';

import { test as base } from '@playwright/test';

export type Services = {
    services: {
        someService: SomeService;
        tokenService: TokenService;
    };
};

export const test = base.extend<Services>({
    services: async ({}, use) => {
        const tokenService = await TokenService.instance();
        const token = await tokenService.getToken('some password');

        const services = {
            someService: await SomeService.instance(token),
            tokenService: await TokenService.instance(),
        };
        await use(services);

        // Dispose API request contexts after each test to release network connections.
        // Playwright does not automatically dispose contexts created via request.newContext().
        // Without this, connections accumulate across tests causing resource leaks in long runs.
        await services.someService.dispose();
        await services.tokenService.dispose();
    },
});
