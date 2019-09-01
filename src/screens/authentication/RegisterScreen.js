/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { IconButton, TextInput, Button } from 'react-native-paper';
import { View, Text } from 'react-native';
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
    };

    render() {
        const { formGroup, inputs } = this.state;
        return (
            <Container>
                <CloseContainer>
                    <IconButton icon="close" />
                </CloseContainer>
                <FormContainer>
                    {renderFormGroup(formGroup, inputs)}
                    <Button mode="outlined">Sign up</Button>
                    <Message>
                        <Text>Already Registered? </Text>
                        <Button>Login</Button>
                    </Message>
                </FormContainer>
            </Container>
        );
    }
}

export default RegisterScreen;
