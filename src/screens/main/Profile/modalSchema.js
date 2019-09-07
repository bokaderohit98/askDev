export const types = {
    INPUT: 'INPUT',
    DATE: 'DATE',
    MULTILINE_INPUT: 'MULTILINE_INPUT',
    CHECKBOX: 'CHECKBOX'
};

export default {
    experience: [
        {
            label: 'Company',
            name: 'company',
            type: types.INPUT,
            value: '',
            validation: value => {
                if (value === '') return { error: true, message: 'Company is required' };
                return { error: false, message: '' };
            }
        },
        {
            label: 'Job Title',
            name: 'title',
            type: types.INPUT,
            value: '',
            validation: value => {
                if (value === '') return { error: true, message: 'Job Title is required' };
                return { error: false, message: '' };
            }
        },
        {
            label: 'Location',
            name: 'location',
            type: types.INPUT,
            value: '',
            validation: value => {
                if (value === '') return { error: true, message: 'Location is required' };
                return { error: false, message: '' };
            }
        },
        {
            type: types.DATE,
            name: 'dates',
            dates: [
                {
                    label: 'From',
                    name: 'from',
                    value: null
                },
                {
                    label: 'To',
                    name: 'to',
                    value: null
                }
            ],
            validation: (from, to, disabled) => {
                if (!from) return { error: true, message: 'Starting date is required' };
                if (!disabled && !to) return { error: true, message: 'End date is required' };
                if (new Date(to).valueOf() < new Date(from).valueOf() && !disabled)
                    return { error: true, message: 'Invalid date range' };
                return { error: false, message: '' };
            }
        },
        {
            label: 'Currently working here',
            name: 'current',
            type: types.CHECKBOX,
            value: false,
            validation: value => {
                return { error: false, message: '' };
            }
        },
        {
            label: 'Description',
            name: 'description',
            type: types.MULTILINE_INPUT,
            value: '',
            validation: value => {
                return { error: false, message: '' };
            }
        }
    ],
    education: [
        {
            label: 'School',
            name: 'school',
            type: types.INPUT,
            value: '',
            validation: value => {
                if (value === '') return { error: true, message: 'School is required' };
                return { error: false, message: '' };
            }
        },
        {
            label: 'Degree',
            name: 'degree',
            type: types.INPUT,
            value: '',
            validation: value => {
                if (value === '') return { error: true, message: 'Degree is required' };
                return { error: false, message: '' };
            }
        },
        {
            label: 'Field of Study',
            name: 'fieldofstudy',
            type: types.INPUT,
            value: '',
            validation: value => {
                if (value === '') return { error: true, message: 'Field of Study is required' };
                return { error: false, message: '' };
            }
        },
        {
            type: types.DATE,
            name: 'dates',
            dates: [
                {
                    label: 'From',
                    name: 'from',
                    value: null
                },
                {
                    label: 'To',
                    name: 'to',
                    value: null
                }
            ],
            validation: (from, to, disabled) => {
                if (!from) return { error: true, message: 'Starting date is required' };
                if (!disabled && !to) return { error: true, message: 'End date is required' };
                if (new Date(to).valueOf() < new Date(from).valueOf() && !disabled)
                    return { error: true, message: 'Invalid date range' };
                return { error: false, message: '' };
            }
        },
        {
            label: 'Currently studying here',
            name: 'current',
            type: types.CHECKBOX,
            value: false,
            validation: value => {
                return { error: false, message: '' };
            }
        },
        {
            label: 'Description',
            name: 'description',
            type: types.MULTILINE_INPUT,
            value: '',
            validation: value => {
                return { error: false, message: '' };
            }
        }
    ]
};
