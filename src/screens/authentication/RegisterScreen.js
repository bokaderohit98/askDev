import React, { Component } from 'react';
import { IconButton, Button, Subheading } from 'react-native-paper';
import Toast from '../../components/Toast';
import {
    Container,
    CloseContainer,
    FormContainer,
    Message,
    renderFormGroup
} from './containers';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formGroup: [
                {
                    label: 'Name',
                    onChangeText: value => this.handleInputChange('name', value)
                },
                {
                    label: 'Email',
                    onChangeText: value =>
                        this.handleInputChange('email', value)
                },
                {
                    label: 'Password',
                    onChangeText: value =>
                        this.handleInputChange('password', value)
                },
                {
                    label: 'Confirm Password',
                    onChangeText: value =>
                        this.handleInputChange('repeatedPassword', value)
                }
            ],
            inputs: {
                name: '',
                email: '',
                password: '',
                repeatedPassword: ''
            },
            inputError: {
                error: false,
                message: 'Name is required'
            }
        };
    }

    handleInputChange = (field, value) => {
        const { inputs } = this.state;
        const update = { ...inputs };
        update[field] = value;
        this.setState({
            inputs: update
        });
        this.handleFormValidation(update);
    };

    setInputErrorMessage = message => {
        this.setState({
            inputError: { message }
        });
    };

    setInputError = () => {
        const { inputError } = this.state;
        const error = inputError.message !== '';
        this.setState({
            inputError: { ...inputError, error }
        });
        return error;
    };

    handleFormValidation = inputs => {
        const { name, email, password, repeatedPassword } = inputs;

        if (name === '') this.setInputErrorMessage('Name is required');
        else if (name.length < 4) this.setInputErrorMessage('Name too short');
        else if (email === '') this.setInputErrorMessage('Email is required');
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            this.setInputErrorMessage('Invalid Email');
        else if (password === '')
            this.setInputErrorMessage('Password is required');
        else if (password !== repeatedPassword)
            this.setInputErrorMessage("Passwords don't match");
        else this.setInputErrorMessage('');
    };

    handleFormSubmit = () => {
        if (this.setInputError()) return;
        console.log('Registering');
    };

    render() {
        const { formGroup, inputs, inputError } = this.state;
        return (
            <>
                <Container>
                    <CloseContainer>
                        <IconButton icon="close" />
                    </CloseContainer>
                    <FormContainer>
                        {renderFormGroup(formGroup, inputs)}
                        <Button mode="outlined" onPress={this.handleFormSubmit}>
                            Sign up
                        </Button>
                        <Message>
                            <Subheading>Already Registered?</Subheading>
                            <Button>Login</Button>
                        </Message>
                    </FormContainer>
                </Container>
                <Toast
                    visible={inputError.error}
                    color="#CC0000"
                    message={inputError.message}
                    onDismiss={() =>
                        this.setState({
                            inputError: { ...inputError, error: false }
                        })
                    }
                />
            </>
        );
    }
}

export default RegisterScreen;
