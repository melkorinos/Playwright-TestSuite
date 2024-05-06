const resources1 = [
    {
        property1: 'value1_1',
    },

    {
        property2: 'value2_1',
    },
];

const resources2 = [
    {
        property1: 'value1_2',
    },

    {
        property2: 'value2_2',
    },
];

export const config: Record<string, any> = {
    'some_env': {
        sets: [
            {
                resources1: resources1,
                specificProperty: [
                    {
                        property1: 'value1',
                    },
                ],
            },
            {
                resources2: resources2,
                specificProperty: [
                    {
                        property1: 'value1',
                    },
                ],
            },
        ],
        url: 'https://some_url/',
    },

    'some_other_env': {
        sets: [
            {
                resources1: resources1,
                specificProperty: [
                    {
                        property1: 'value1',
                    },
                ],
            },
            {
                resources2: resources2,
                specificProperty: [
                    {
                        property1: 'value1',
                    },
                ],
            },
        ],
        url: 'https://some_other_url/',
    },
};
