import { APIRequestContext, request } from '@playwright/test';

export class TokenService {
    private static readonly tokenEndpoint = 'token/';

    private constructor(
        private readonly apiContext: APIRequestContext,
        private readonly baseUrl: string,
    ) {}

    public static async create(baseUrl: string): Promise<TokenService> {
        const apiContext = await request.newContext({ baseURL: baseUrl });
        return new TokenService(apiContext, baseUrl);
    }

    public async getToken(password: string): Promise<string> {
        const body = { secret: password };
        console.log(`>> GET token from ${this.baseUrl}${TokenService.tokenEndpoint}`);
        const response = await this.apiContext.post(TokenService.tokenEndpoint, { form: body });
        return await response.json();
    }

    public async dispose(): Promise<void> {
        await this.apiContext.dispose();
    }
}
