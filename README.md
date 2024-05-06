## Install

1. Clone the solution locally, preferably under your `C:\` drive.
2. Run `npm install` in terminal. You have to be in the root directory of the solution `C:\AutomationTests`.
3. Get environment variables 
4. Copy the contents of `.env.example` file and create a new file `.env` with values from LastPass

## Update

1. Run `npm install @playwright/test@latest`
2. Run `npx playwright install` to download the newest web drivers
3. Verify by ensuring that `npx playwright --version` matches the version listed in your package.json

### VS Code extensions

#### Required

1. **_Playwright Test for VScode_**
2. **_Prettier - Code formatter_** extensions. Set Prettier as a default formatter by `ctrl + shift + p` -> `Format document with` -> `Configure default formatter` and choose prettier.

#### Reccomended

1. [Pretty TS errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) : enhances display of typescript errors
2. [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) : browser all repo's tech dept with CTRL + SHIFT + P -> `highlight`

## Run

### Run preconfigured test scripts from `package.json`

```sh
npm run test:api
```

### Run single test with CLI

```sh
npm run test:e2e -- -g "[test title (or part of it)]"
```

#### Run test(s) in VSCode

With the [Playwright Test for VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) you can easily run one or many tests.

You can also see the browser and debug tests as they are running. See the instructions on the extension's marketplace page for more information.  
In case the Green test arrow is not visible in your IDE attempt to reload with `ctrl + shift + p` -> `Developer: Reload Window`.

## Contents

### Test Suite Flow

1. When a test or a collection of tests is triggered, the `.env` file is read to parse the ENV variables. For pipelines these vars are stored in [azure libraries](https://dev.azure.com/.../_library?itemType=VariableGroups).
2. From `package.json` based on the script that was selected, the project + the amount of workers are determined. Number of workers cannot be larger than the number of sets in [config.ts](/config/config.ts).
3. If workers are > 1 then the tests will be run in parallel. This is handled in [configHelper.ts](/config/configHelper.ts). Currently we have 2 sets, hence 2 workers max.
    1. First the correct set of sets per server is selected using `getConfigSetByParallelIndex`.
    2. Then the rest of the resources are sellected by the various functions.
4. From `playwright.config.ts` based on the project the following are determined:
    1. The Directory where the test runner will look for matching test files.
    2. Various preconfigured settings such as maximum test run time / browser permissions and other playwright available options.
    3. The report format which is common for all projects.
5. From the fixtures folder, the base `test` object is extended with API services + E2E components. 
6. Setup and teardown :
    1. Per fixture is implemented before and after the `use` function respectively. 
    2. Per service is implemented on the service file itself just after the singleton logic. 


### Service template

```TS
//Imports

export class ServiceName {
    private static instanceCache?: IdaService; //the instance of the service in case it never needed in mor than one context
    private apiContext!: APIRequestContext; //the services api context

    endpoints = {
        main: 'dialogue/', //all endpoints should end with a `/`
        someEndpoint: 'someEndpoint/',
    };

    //Service constructor
    public static async instance(token: string): Promise<IdaService> {
        if (!this.instanceCache) {
            this.instanceCache = new this();
            this.instanceCache.apiContext = await request.newContext({
                baseURL: getWebAgentUrl() + this.instanceCache.endpoints.main,
                extraHTTPHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return this.instanceCache;
    }

    //GET request
    public async getEndpoint(): Promise<APIResponse> {
        const endpoint = this.endpoints.someOtherEndpoint;
        console.log(`>> GET someEndpoint to ${this.endpoints.main}${endpoint}`);
        return await this.apiContext.get(endpoint);
    }

    //POST request
    public async postEndpoint(value1: string, value2: string): Promise<APIResponse> {
        const endpoint = this.endpoints.someOtherEndpoint;
        const body = { property1: value1, property2: value2 };
        console.log(`>> POST someEndpoint to ${this.endpoints.main}${endpoint}`);
        return await this.apiContext.post(endpoint, { data: body });
    }
}
```

### Test file template

Test files should follow the below generic structure. For API, test files contain multiple test cases for the same endpoint.

```TS
//Imports

test.beforeAll(async ({ services }) => {
    // All setup goes here, this is optional depending on tests
    await services.someService.createSomething()
});

test('[Azure ID] Test Name', async function ({ services }) { //always add the test case ID from azure test cases
    // Define test-wide variables that span between test steps here
    let testWideVariable1 : type, testWideVariable2 : type;

    await test.step('Description of the action', async () => {
        // Input wrong value
        // expect error
    });

    await test.step('Description of the action', async () => {
        // Input correct value
        // expect success
    });
});

test.afterAll(async ({ services }) => {
    // All teardown goes here + all tests should clean up after themselves
});
```

### Pipelines

Currently there are 3 pipelines that are produced from this repo:

-   **API** : runs all API tests. 
-   **E2E** : runs all E2E tests. 

#### Connecting pipeline runs to azure tests

For achieving this the [following package is used](https://www.npmjs.com/package/@alex_neo/playwright-azure-reporter). All tests need to be matched to their azure test case ID.

-   The package is used as a reported on `playwright.config.ts` for CI runs.
-   The plan ID is collected from the URL of the test cases.
-   The rest of the information come either from the ENV runs of the pipelines agent or the devOps team.

## Resources

### Playwright

-   [Best practices](https://playwright.dev/docs/best-practices).
-   [Locators](https://playwright.dev/docs/locators).
-   [Fixtures](https://playwright.dev/docs/api/class-fixtures).
-   [Assertions](https://playwright.dev/docs/test-assertions).

