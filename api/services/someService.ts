import { APIRequestContext, APIResponse, request } from '@playwright/test';
import { getUrl } from 'config/configHelper';

export class SomeService {
    private static instanceCache?: SomeService;
    private apiContext!: APIRequestContext;

    endpoints = {
        main: 'main/',
        someEndpoint: 'someEndpoint/',
    };

    public static async instance(token: string): Promise<SomeService> {
        if (!this.instanceCache) {
            this.instanceCache = new this();
            this.instanceCache.apiContext = await request.newContext({
                baseURL: getUrl() + this.instanceCache.endpoints.main,
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

    //getToken
    public async getToken(): Promise<string> {
        const token = 'some token';
        console.log(`>> GET token: ${token}`);
        return token;
    }
}
