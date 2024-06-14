import { test as base } from '@playwright/test';

import { SomeService, TokenService } from 'api/services';

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
    },
});
