import { WorkerSlot, config } from 'config/config';

/**
 * Returns the full environment config for the active SERVER.
 * Useful as an extension point — callers can read any environment-level
 * property directly rather than going through individual helper functions.
 */
export function getConfigByServer() {
    const server = process.env.SERVER;
    if (!server) throw new Error('SERVER env variable was not defined');
    return config[server];
}

/**
 * Returns the base URL for the active environment.
 * Used by services, fixtures, and playwright.config.ts.
 */
export function getUrl(): string {
    return getConfigByServer().url;
}

/**
 * Returns the WorkerSlot assigned to the current parallel worker.
 * Each slot holds the non-credential resources (e.g. test tenant, booking slot)
 * exclusively owned by this worker — ensuring parallel workers never collide.
 * Tests should never call this directly; consume via a fixture or testData helper.
 */
export function getWorkerSlot(): WorkerSlot {
    const index = Number(process.env.TEST_PARALLEL_INDEX ?? 0);
    const slots = getConfigByServer().workerSlots;
    if (index >= slots.length) {
        throw new Error(
            `TEST_PARALLEL_INDEX ${index} is out of range — only ${slots.length} workerSlot(s) defined for this environment`,
        );
    }
    return slots[index];
}
