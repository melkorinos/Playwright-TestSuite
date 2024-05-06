import { config } from 'config/config';

let parallelIndex = process.env.TEST_PARALLEL_INDEX;

/**
 * SERVER should be defined in .env file or in the pipeline .yaml for CI/CD
 */
export function getConfigByServer() {
    const server = process.env.SERVER;
    if (!server) throw new Error('SERVER env variable was not defined');
    return config[server];
}

export function getConfigSetByParallelIndex() {
    return getConfigByServer().sets[Number(parallelIndex)];
}

export function getUrl() {
    return getConfigByServer().url;
}
