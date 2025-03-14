export const config: Record<
    string,
    {
        properties: { [key: string]: string }[];
        url: string;
    }
> = {
    prod: {
        // The properties are used to determine which set of parameters to use in the tests in case of parallel execution
        properties: [
            {
                propertySet1: 'value1',
            },
            {
                propertySet2: 'value1',
            },
        ],
        url: 'https://catfact.ninja/',
    },

    test: {
        properties: [
            {
                propertySet1: 'value1',
            },
            {
                propertySet2: 'value1',
            },
        ],
        url: 'https://some_other_url/',
    },
};
