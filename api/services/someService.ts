import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { getUrl } from 'config/configHelper';

export class SomeService {
    private static instanceCache?: SomeService;
    private apiContext!: APIRequestContext;

    endpoints = {
        main: getUrl() + 'facts/',
        someEndpoint: '',
    };

    public static async instance(token: string): Promise<SomeService> {
        if (!this.instanceCache) {
            this.instanceCache = new this();
            this.instanceCache.apiContext = await request.newContext({
                baseURL: this.instanceCache.endpoints.main,
                extraHTTPHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return this.instanceCache;
    }

    public async getEndpoint(): Promise<APIResponse> {
        const endpoint = this.endpoints.someEndpoint;
        console.log(`>> GET something to ${this.endpoints.main}${endpoint}`);
        return await this.apiContext.get(endpoint);
    }

    public async postEndpoint(inputData: string): Promise<APIResponse> {
        const endpoint = this.endpoints.someEndpoint;

        const body = { data: inputData };
        console.log(`>> POST something to ${this.endpoints.main}${endpoint}`);
        return await this.apiContext.post(endpoint, { data: body });
    }
}
