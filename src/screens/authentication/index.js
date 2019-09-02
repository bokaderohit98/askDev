import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components';
import { IconButton, Button, Subheading, TextInput } from 'react-native-paper';
import Toast from '../../components/Toast';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-bottom: 72;
`;

const CloseContainer = styled.View`
    display: flex;
    margin-top: 24px;
    padding: 16px;
    flex-direction: row-reverse;
`;

const FormContainer = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Message = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 42;
`;

const style = StyleSheet.create({
    Input: {
        maxWidth: 350,
        backgroundColor: '#ffffff',
        marginBottom: 18
    }
});

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = props;
        this.state = {
            type: navigation.getParam('type', 'register'),
            formGroup: [
                {
                    label: 'Name',
                    name: 'name',
                    onChangeText: value => this.handleInputChange('name', value)
                },
                {
                    label: 'Email',
                    name: 'email',
                    login: true,
                    onChangeText: value =>
                        this.handleInputChange('email', value)
                },
                {
                    label: 'Password',
                    name: 'password',
                    login: true,
                    onChangeText: value =>
                        this.handleInputChange('password', value)
                },
                {
                    label: 'Confirm Password',
                    name: 'repeatedPassword',
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
                message:
                    navigation.getParam('type', 'register') === 'register'
                        ? 'Name is required'
                        : 'Email is required'
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
        const { type } = this.state;
        const isValid = type === 'register';
        const { name, email, password, repeatedPassword } = inputs;

        if (name === '' && isValid)
            this.setInputErrorMessage('Name is required');
        else if (name.length < 4 && isValid)
            this.setInputErrorMessage('Name too short');
        else if (email === '') this.setInputErrorMessage('Email is required');
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            this.setInputErrorMessage('Invalid Email');
        else if (password === '')
            this.setInputErrorMessage('Password is required');
        else if (password !== repeatedPassword && isValid)
            this.setInputErrorMessage("Passwords don't match");
        else this.setInputErrorMessage('');
    };

    handleFormSubmit = () => {
        const { type } = this.props;
        if (this.setInputError()) return;
        if (type === 'register') console.log('Registering');
        else console.log('Logging in');
    };

    handleSwitchNavigation = () => {
        const { type } = this.state;
        this.setState({
            type: type === 'register' ? 'login' : 'register',
            inputError: {
                error: false,
                message:
                    type === 'register'
                        ? 'Email is required'
                        : 'Name is required'
            }
        });
    };

    renderFormGroup = () => {
        const { formGroup, inputs, type } = this.state;
        const { width } = Dimensions.get('screen');

        const filteredFormGroup = formGroup.filter(
            item => type === 'register' || item.login
        );
        const filteredNames = filteredFormGroup.map(item => item.name);
        const values = filteredNames.map(name => inputs[name]);

        return filteredFormGroup.map((item, i) => (
            <TextInput
                key={item.label}
                label={item.label}
                value={values[i]}
                onChangeText={item.onChangeText}
                style={{ ...style.Input, width: width - 20 }}
            />
        ));
    };

    render() {
        const { inputError, type } = this.state;
        return (
            <>
                <Container>
                    <CloseContainer>
                        <IconButton icon="close" />
                    </CloseContainer>
                    <FormContainer>
                        {this.renderFormGroup()}
                        <Button mode="outlined" onPress={this.handleFormSubmit}>
                            {type === 'register' ? 'Sign Up' : 'Login'}
                        </Button>
                        <Message>
                            <Subheading>
                                {type === 'register'
                                    ? 'Already Registered?'
                                    : 'Not a Member?'}
                            </Subheading>
                            <Button onPress={this.handleSwitchNavigation}>
                                {type === 'register' ? 'Login' : 'Register'}
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

export default RegisterScreen;
