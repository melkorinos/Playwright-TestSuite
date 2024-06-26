- [Install](#install)
- [Update](#update)
  - [VS Code extensions](#vs-code-extensions)
    - [Required](#required)
    - [Reccomended](#reccomended)
- [Run](#run)
  - [Run preconfigured test scripts from `package.json`](#run-preconfigured-test-scripts-from-packagejson)
  - [Run single test with CLI](#run-single-test-with-cli)
    - [Run test(s) in VSCode](#run-tests-in-vscode)
- [Contents](#contents)
  - [Test Suite Flow](#test-suite-flow)
  - [Service template](#service-template)
  - [Test file template](#test-file-template)
  - [Pipelines](#pipelines)
  - [TODOs and FIXMEs](#todos-and-fixmes)
    - [Connecting pipeline runs to azure tests](#connecting-pipeline-runs-to-azure-tests)
- [Resources](#resources)
  - [Playwright](#playwright)

## Install

1. Clone the solution locally, preferably under your `C:\` drive.
1. Ensure you have an [LTS Node.js version](https://nodejs.org/) installed, [Git](https://git-scm.com/) for version control, and [Visual Studio Code](https://code.visualstudio.com/) as your code editor.
1. Install typescript and ts node globally with `npm install -g ts-node typescript`
1. Run `npm ci` in terminal. You have to be in the root directory of the project `C:\AutomationTests`. We run `npm CI` instead of `npm i` as to not update dependecies during regular PRs.
1. Run `npx playwright install` to download the newest web drivers
1. Copy the contents of `.env.example` file and create a new file `.env` and input the values.

## Update

1. Run `npm install @playwright/test@latest`
1. Run `npx playwright install` to download the newest web drivers
1. Verify by ensuring that `npx playwright --version` matches the version listed in your package.json

### VS Code extensions

#### Required

1. **_Playwright Test for VScode_**
1. **_Prettier - Code formatter_** extensions. Set Prettier as a default formatter by `ctrl + shift + p` -> `Format document with` -> `Configure default formatter` and choose prettier.

#### Reccomended

1. [Pretty TS errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) : enhances display of typescript errors
1. [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) : browser all repo's tech dept with CTRL + SHIFT + P -> `highlight`

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
1. From `package.json` based on the script that was selected, the project + the amount of workers are determined. Number of workers cannot be larger than the number of sets in [config.ts](/config/config.ts).
1. If workers are > 1 then the tests will be run in parallel. This is handled in [configHelper.ts](/config/configHelper.ts). Currently we have 2 sets, hence 2 workers max.
    1. First the correct set of sets per server is selected using `getConfigSetByParallelIndex`.
    2. Then the rest of the resources are sellected by the various functions.
1. From `playwright.config.ts` based on the project the following are determined:
    1. The Directory where the test runner will look for matching test files.
    2. Various preconfigured settings such as maximum test run time / browser permissions and other playwright available options.
    3. The report format which is common for all projects.
1. From the fixtures folder, the base `test` object is extended with API services + E2E components. The base expect object is extended with custom matchers. 
1. Setup and teardown :
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

Example API pipeline with azure devops setup is included

### TODOs and FIXMEs
Code can be marked with the following 2 options. You can use the [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) to browse them.

- //TODO: For all items related to tech dept and generic improvements.
- //FIXME: For all items/tests that are skipped. Either they are validly failing with no planned resolution in the near future OR that they are still under development.


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
-   [Customer Matchers](https://playwright.dev/docs/test-assertions#add-custom-matchers-using-expectextend)

