import { config } from 'config/config';

let parallelIndex = process.env.TEST_PARALLEL_INDEX;

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
