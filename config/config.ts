interface PropertySet {
    [key: string]: string;
}

interface EnvironmentConfig {
    sets: PropertySet[];
    url: string;
}

export const config: Record<string, EnvironmentConfig> = {
    example: {
        // The sets are used to determine which set of properties to use in the tests in case of parallel execution
        sets: [
            {
                propertySet1: 'value1',
            },
            {
                propertySet2: 'value1',
            },
        ],
        url: 'https://catfact.ninja/',
    },

    some_other_env: {
        sets: [
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
