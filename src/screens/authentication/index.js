import React, { Component } from 'react';
import { Dimensions, StyleSheet, Keyboard, TouchableWithoutFeedback, BackHandler, View } from 'react-native';
import styled from 'styled-components';
import { IconButton, Button, Subheading, TextInput, Checkbox } from 'react-native-paper';
import { connect } from 'react-redux';
import Toast from '../../components/Toast';
import { clearSuccess, clearError } from '../../redux/api';
import axios from '../../utils/axios';
import routes from '../../utils/routes';
import AuthService from '../../utils/authService';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-bottom: 72px;
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
            showPassword: false,
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
                    onChangeText: value => this.handleInputChange('email', value)
                },
                {
                    type: 'password',
                    label: 'Password',
                    name: 'password',
                    login: true,
                    onChangeText: value => this.handleInputChange('password', value)
                },
                {
                    type: 'password',
                    label: 'Confirm Password',
                    name: 'repeatedPassword',
                    onChangeText: value => this.handleInputChange('repeatedPassword', value)
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
                    navigation.getParam('type', 'register') === 'register' ? 'Name is required' : 'Email is required'
            },
            registerUser: {
                loading: false,
                error: false,
                result: null
            }
        };
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.navigateBack);
    }

    static getDerivedStateFromProps(props, state) {
        const { navigation, loginUser } = props;
        if (loginUser && !loginUser.loading && loginUser.isAuthenticated && loginUser.error)
            navigation.replace('CreateProfile');
        else if (loginUser && !loginUser.loading && loginUser.isAuthenticated && !loginUser.error)
            navigation.replace('Main');
        return state;
    }

    navigateBack = () => {
        const { navigation } = this.props;
        navigation.replace('Main');
        return true;
    };

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

        if (name === '' && isValid) this.setInputErrorMessage('Name is required');
        else if (name.length < 4 && isValid) this.setInputErrorMessage('Name too short');
        else if (email === '') this.setInputErrorMessage('Email is required');
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            this.setInputErrorMessage('Invalid Email');
        else if (password === '') this.setInputErrorMessage('Password is required');
        else if (password !== repeatedPassword && isValid) this.setInputErrorMessage("Passwords don't match");
        else this.setInputErrorMessage('');
    };

    handleFormSubmit = () => {
        Keyboard.dismiss();
        const { type, inputs } = this.state;
        if (this.setInputError()) return;
        if (type === 'register') this.handleRegisterUser();
        else this.authService.login(inputs.email, inputs.password);
    };

    handleRegisterUser = () => {
        const { registerUser, inputs } = this.state;
        const { email, name, password, repeatedPassword: password2 } = inputs;
        this.setState({ registerUser: { ...registerUser, loading: true } });
        axios
            .post(routes.register, {
                email,
                name,
                password,
                password2
            })
            .then(res => {
                this.setState({
                    registerUser: {
                        ...registerUser,
                        loading: false,
                        success: true
                    }
                });
                this.authService.login(email, password);
            })
            .catch(err => {
                this.setState({
                    registerUser: {
                        ...registerUser,
                        loading: false,
                        error: true
                    }
                });
            });
    };

    handleSwitchNavigation = () => {
        const { type } = this.state;
        this.setState({
            type: type === 'register' ? 'login' : 'register',
            inputError: {
                error: false,
                message: type === 'register' ? 'Email is required' : 'Name is required'
            }
        });
    };

    closeScreen = () => {
        const { navigation } = this.props;
        navigation.replace('Main');
    };

    handleCheckboxClick = () => {
        const { showPassword } = this.state;
        this.setState({
            showPassword: !showPassword
        });
    };

    encodePassword = password => {
        return '*'.repeat(password.length);
    };

    renderFormGroup = disabled => {
        const { formGroup, inputs, type, showPassword } = this.state;
        const { width } = Dimensions.get('screen');

        const filteredFormGroup = formGroup.filter(item => type === 'register' || item.login);
        const filteredNames = filteredFormGroup.map(item => item.name);
        const values = filteredNames.map(name => inputs[name]);

        return filteredFormGroup.map((item, i) => (
            <TextInput
                key={item.label}
                secureTextEntry={item.type === 'password' && !showPassword}
                label={item.label}
                value={values[i]}
                onChangeText={item.onChangeText}
                style={{ ...style.Input, width: width - 20 }}
                disabled={disabled}
            />
        ));
    };

    renderError = () => {
        const { inputError, registerUser } = this.state;
        const { loginUser, clearError } = this.props;
        let message = '';
        const error = inputError.error || registerUser.error || (loginUser.error && !loginUser.isAuthenticated);
        if (inputError.error) message = inputError.message;
        else if (registerUser.error) message = 'Invalid Details';
        else if (loginUser.error && !loginUser.isAuthenticated) message = loginUser.message;
        return (
            <Toast
                visible={error}
                color="#CC0000"
                message={message}
                onDismiss={() => {
                    this.setState({
                        inputError: { ...inputError, error: false },
                        registerUser: { ...registerUser, error: false }
                    });
                    clearError();
                }}
            />
        );
    };

    renderSuccess = () => {
        const { registerUser } = this.state;
        const { loginUser, clearSuccess } = this.props;
        let message = '';
        const success = registerUser.success || loginUser.success;
        if (registerUser.success) message = 'Registration successful! Logging in';
        else if (loginUser.success) message = 'Successfully logged in';
        return (
            <Toast
                visible={success}
                color="#007E33"
                message={message}
                onDismiss={() => {
                    this.setState({
                        registerUser: { ...registerUser, success: false }
                    });
                    clearSuccess();
                }}
            />
        );
    };

    render() {
        const { type, registerUser, showPassword } = this.state;
        const { loginUser } = this.props;
        const disabled = registerUser.loading || loginUser.loading;
        return (
            <>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container>
                        <CloseContainer>
                            <IconButton icon="close" disabled={disabled} onPress={this.closeScreen} />
                        </CloseContainer>
                        <FormContainer>
                            {this.renderFormGroup(disabled)}
                            <View
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: 20,
                                    alignItems: 'center'
                                }}
                            >
                                <Subheading>Show Password</Subheading>
                                <Checkbox
                                    status={showPassword ? 'checked' : 'unchecked'}
                                    onPress={this.handleCheckboxClick}
                                    color="#0000ff"
                                />
                            </View>
                            <Button
                                mode="outlined"
                                onPress={this.handleFormSubmit}
                                disabled={disabled}
                                loading={disabled}
                            >
                                {type === 'register' ? 'Sign Up' : 'Login'}
                            </Button>
                            <Message>
                                <Subheading>{type === 'register' ? 'Already Registered?' : 'Not a Member?'}</Subheading>
                                <Button onPress={this.handleSwitchNavigation} disabled={disabled}>
                                    {type === 'register' ? 'Login' : 'Register'}
                                </Button>
                            </Message>
                        </FormContainer>
                    </Container>
                </TouchableWithoutFeedback>
                {this.renderError()}
                {/* {this.renderSuccess()} */}
            </>
        );
    }
}

const mapStateToProps = state => ({
    loginUser: {
        loading: state.loginLoading,
        error: state.loginError,
        message: 'Invalid Credentials',
        isAuthenticated: state.isAuthenticated
    }
});

export default connect(
    mapStateToProps,
    { clearSuccess, clearError }
)(RegisterScreen);
