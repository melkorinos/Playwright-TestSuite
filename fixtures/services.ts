import { SomeService, TokenService } from 'api/services';

import { test as base } from '@playwright/test';
import { getUrl } from 'config/configHelper';

/**
 * AgentServices groups all services available to a single authenticated agent.
 * - tokenService: included in every agent for auth-behaviour tests (e.g. bad passwords, disallowed domains).
 * - someService: authenticated with the agent's token; each agent has an independent API context.
 */
export type AgentServices = {
    tokenService: TokenService;
    someService: SomeService;
};

export type ServiceFixtures = {
    servicesAgent1: AgentServices;
    servicesAgent2: AgentServices;
};

async function buildAgentServices(password: string): Promise<AgentServices> {
    const baseUrl = getUrl();
    const tokenService = await TokenService.create(baseUrl);
    const token = await tokenService.getToken(password);
    const someService = await SomeService.create(baseUrl, token);
    return { tokenService, someService };
}

async function disposeAgentServices(agent: AgentServices): Promise<void> {
    // Dispose API request contexts after each worker to release network connections.
    // Playwright does not automatically dispose contexts created via request.newContext().
    await agent.someService.dispose();
    await agent.tokenService.dispose();
}

export const test = base.extend<{}, ServiceFixtures>({
    servicesAgent1: [
        async ({}, use) => {
            const agent = await buildAgentServices(process.env.AGENT1_PASSWORD ?? '');
            await use(agent);
            await disposeAgentServices(agent);
        },
        { scope: 'worker' },
    ],

    servicesAgent2: [
        async ({}, use) => {
            const agent = await buildAgentServices(process.env.AGENT2_PASSWORD ?? '');
            await use(agent);
            await disposeAgentServices(agent);
        },
        { scope: 'worker' },
    ],
});
