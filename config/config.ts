1./**
 * WorkerSlot holds the non-credential resources exclusively owned by one parallel worker.
 * Add fields here as a project requires (e.g. tenant IDs, sub-domains, test account names).
 * One slot per worker — index matches TEST_PARALLEL_INDEX.
 */
export interface WorkerSlot {
    someKey: string;
}

interface EnvironmentConfig {
    url: string;
    // Add further environment-level properties here as projects require
    // (e.g. adminUrl, apiGatewayUrl, featureFlags).
    workerSlots: WorkerSlot[];
}

export const config: Record<string, EnvironmentConfig> = {
    example: {
        url: 'https://catfact.ninja/',
        workerSlots: [
            { someKey: 'value1' },
            { someKey: 'value2' },
        ],
    },

    some_other_env: {
        url: 'https://some_other_url/',
        workerSlots: [
            { someKey: 'value1' },
            { someKey: 'value2' },
        ],
    },
};
