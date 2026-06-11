import * as fs from 'fs';

import { APIRequestContext, APIResponse, request } from '@playwright/test';

import path from 'path';

export class SomeService {
    private static readonly endpoints = {
        facts: 'facts/',
        someEndpoint: '',
        uploadFile: 'upload',
    };

    private constructor(private readonly apiContext: APIRequestContext) {}

    public static async create(baseUrl: string, token: string): Promise<SomeService> {
        const apiContext = await request.newContext({
            baseURL: baseUrl + SomeService.endpoints.facts,
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return new SomeService(apiContext);
    }

    public async getEndpoint(): Promise<APIResponse> {
        const endpoint = SomeService.endpoints.someEndpoint;
        console.log(`>> GET something to ${endpoint}`);
        return await this.apiContext.get(endpoint);
    }

    public async postEndpoint(inputData: string): Promise<APIResponse> {
        const endpoint = SomeService.endpoints.someEndpoint;
        const body = { data: inputData };
        console.log(`>> POST something to ${endpoint}`);
        return await this.apiContext.post(endpoint, { data: body });
    }

    public async uploadFile(fileName: string): Promise<APIResponse> {
        const endpoint = SomeService.endpoints.facts + SomeService.endpoints.uploadFile;
        const filePath = path.resolve(__dirname, '../../testData', fileName);
        const fileBuffer = fs.createReadStream(filePath);

        return this.apiContext.post(endpoint, {
            headers: { 'content-type': 'multipart/form-data' },
            multipart: { file: fileBuffer },
        });
    }

    public async dispose(): Promise<void> {
        await this.apiContext.dispose();
    }
}
