export default [
    value => {
        const correct = value.split(' ').length === 1;
        let errorMessage = '';
        if (!correct) errorMessage = 'Handle must not contain any spaces';
        return { correct, errorMessage };
    },
    value => {
        const correct = value.split(',').length > 2;
        let errorMessage = '';
        if (!correct) errorMessage = 'Add atleast 3 skills';
        return { correct, errorMessage };
    },
    () => ({ correct: true }),
    () => ({ correct: true }),
    () => ({ correct: true }),
    value => {
        const correct =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(
                value
            ) || value === '';
        let errorMessage = '';

        if (!correct) errorMessage = 'Invalid URL';
        return { correct, errorMessage };
    },
    value => {
        const correct = value.split(' ').length === 1;
        let errorMessage = '';
        if (!correct) errorMessage = 'Github username should not contain spaces';
        return { correct, errorMessage };
    },
    () => ({ correct: true })
];
