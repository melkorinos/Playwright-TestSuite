import { APIRequestContext, request } from '@playwright/test';
import { getUrl } from 'config/configHelper';

export class TokenService {
    private static instanceCache?: TokenService;
    private apiContext!: APIRequestContext;

    endpoints = {
        main: getUrl(),
        token: 'token/',
    };

    public static async instance(): Promise<TokenService> {
        if (!this.instanceCache) {
            this.instanceCache = new this();
            this.instanceCache.apiContext = await request.newContext({
                baseURL: this.instanceCache.endpoints.main,
            });
        }

        return this.instanceCache;
    }

    public async getToken(password: string): Promise<string> {
        const endpoint = this.endpoints.token;

        const body = { secret: password };

        console.log(`>> GET token from ${this.endpoints.main}${endpoint}`);
        const response = await this.apiContext.post(endpoint, { form: body });
        return await response.json();
    }
}
