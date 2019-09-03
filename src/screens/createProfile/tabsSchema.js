import * as types from './tabTypes';

export default [
    {
        label: 'Handle',
        name: 'handle',
        required: true,
        message: "A unique handle let's you stand out.",
        value: '',
        type: types.INPUT
    },
    {
        label: 'Skills',
        name: 'skills',
        required: true,
        message: 'Tells us what you are capable of.',
        value: '',
        type: types.MULTIPLE_INPUT
    },
    {
        label: 'Profession',
        name: 'profession',
        required: true,
        message: 'What do you do for a living?',
        options: [
            'Developer',
            'Junior Develper',
            'Senior Develper',
            'Manager',
            'Student',
            'Instructor',
            'Intern',
            'Other'
        ],
        value: '',
        type: types.SELECT
    },
    {
        label: 'Company',
        name: 'company',
        required: false,
        message: 'Where do you work?',
        value: '',
        type: types.INPUT
    },
    {
        label: 'Location',
        name: 'location',
        required: false,
        message: 'Tell us where do you live.',
        value: '',
        type: types.INPUT
    },
    {
        label: 'website',
        name: 'website',
        required: false,
        message: 'Website to show off.',
        value: '',
        type: types.INPUT
    },
    {
        label: 'Github Username',
        name: 'githubusername',
        required: false,
        message: 'Show others the great works you have done.',
        value: '',
        type: types.INPUT
    },
    {
        lable: 'Bio',
        name: 'bio',
        required: false,
        message: 'We are sure you have more to tell us!',
        type: types.MULTILINE_INPUT
    }
];
