import React, { Component } from 'react';
import { Button, IconButton, Subheading } from 'react-native-paper';
import Toast from '../../components/Toast';
import {
    Container,
    CloseContainer,
    FormContainer,
    Message,
    renderFormGroup
} from './containers';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formGroup: [
                {
                    label: 'Email',
                    onChangeText: value =>
                        this.handleInputChange('email', value)
                },
                {
                    label: 'Password',
                    onChangeText: value =>
                        this.handleInputChange('password', value)
                }
            ],
            inputs: {
                email: '',
                password: ''
            },
            inputError: {
                error: false,
                message: 'Email is required'
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
        this.setState({ inputError: { message } });
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
        const { email, password } = inputs;

        if (email === '') this.setInputErrorMessage('Email is required');
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            this.setInputErrorMessage('Invalid Email');
        else if (password === '')
            this.setInputErrorMessage('Password is required');
        else this.setInputErrorMessage('');
    };

    handleFormSubmit = () => {
        if (this.setInputError()) return;
        console.log('Logging');
    };

    navigateToRegister = () => {
        const { navigation } = this.props;
        navigation.navigate('Register');
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
                            Login
                        </Button>
                        <Message>
                            <Subheading>Not a member?</Subheading>
                            <Button onPress={this.navigateToRegister}>
                                Sign up
                            </Button>
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

export default LoginScreen;
