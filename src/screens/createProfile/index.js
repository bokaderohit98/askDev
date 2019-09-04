import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import styled from 'styled-components';
import tabsSchema from './tabsSchema';
import tabValidations from './tabValidations';
import ActionContainer from './ActionContainer';
import Toast from '../../components/Toast';
import AuthService from '../../utils/authService';
import axios from '../../utils/axios';
import routes from '../../utils/routes';
import { setProfile } from '../../redux/api';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

const TabContainer = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-right: 40px;
`;

const Message = styled.Text`
    align-items: center;
    font-size: 32px;
    padding: 16px;
`;

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.authService = new AuthService();
        this.state = {
            activeTabIndex: -1,
            tabs: tabsSchema,
            nextDisabled: false,
            prevDisabled: true,
            tabValidation: {
                error: false,
                message: ''
            },
            saveProfile: {
                loading: false,
                error: false,
                message: false
            }
        };
    }

    handleTabSwitch = event => {
        Keyboard.dismiss();

        const error = this.validateCurrentTab();
        if (error) return;

        let { activeTabIndex, tabs } = this.state;
        let nextDisabled = false;
        let prevDisabled = false;

        if (event === 'prev') {
            activeTabIndex -= 1;
            if (activeTabIndex === 0) prevDisabled = true;
        } else if (event === 'next') {
            activeTabIndex += 1;
            if (activeTabIndex !== tabs.length) {
                const { required, value } = tabs[activeTabIndex];
                if (required && value === '') nextDisabled = true;
            }
            if (activeTabIndex === 0) prevDisabled = true;
        }
        this.setState({ activeTabIndex, prevDisabled, nextDisabled });
    };

    handleInputChange = value => {
        const { tabs, activeTabIndex } = this.state;
        const nextDisabled = tabs[activeTabIndex].required && value === '';
        const updated = [...tabs];
        updated[activeTabIndex].value = value;
        this.setState({ tabs: updated, nextDisabled });
    };

    clearErrors = () => {
        this.setState({
            tabValidation: {
                error: false,
                message: ''
            }
        });
    };

    validateCurrentTab = () => {
        const { activeTabIndex, tabs } = this.state;

        if (activeTabIndex === tabs.length || activeTabIndex === -1)
            return false;

        const { correct, errorMessage } = tabValidations[activeTabIndex](
            tabs[activeTabIndex].value
        );
        this.setState({
            tabValidation: {
                error: !correct,
                message: errorMessage
            }
        });
        return !correct;
    };

    saveProfile = () => {
        const { saveProfile, tabs } = this.state;
        this.setState({ saveProfile: { ...saveProfile, loading: true } });
        const requestData = tabs.reduce((data, item) => {
            const { name, value } = item;
            const updated = { ...data };
            updated[name] = value;
            return updated;
        }, {});
        this.authService
            .validateToken()
            .then(() => {
                return this.authService.getToken();
            })
            .then(jwt => {
                return axios.post(routes.profile, requestData, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                });
            })
            .then(res => {
                const { setProfile } = this.props;
                setProfile(res.data);
                this.setState({
                    saveProfile: {
                        ...saveProfile,
                        loading: false
                    }
                });
            })
            .catch(err => {
                this.setState({
                    saveProfile: {
                        ...saveProfile,
                        loading: false,
                        error: true,
                        message: 'Some error occurred'
                    }
                });
            });
    };

    renderInitTab = () => {
        return (
            <TabContainer>
                <Message>Let&apos; create your awesome profile!</Message>
            </TabContainer>
        );
    };

    renderSaveTab = () => {
        const { saveProfile } = this.state;
        return (
            <TabContainer>
                <Message>Let&apos; save your profile!</Message>
                <Button
                    mode="outlined"
                    onPress={this.saveProfile}
                    disabled={saveProfile.disabled}
                    loading={saveProfile.loading}
                >
                    Save Profile
                </Button>
            </TabContainer>
        );
    };

    renderError = () => {
        const { tabValidation, saveProfile } = this.state;
        const {
            error: validationError,
            message: validationErrorMessage
        } = tabValidation;
        const {
            error: saveProfileError,
            message: saveProfileErrorMessage
        } = saveProfile;
        const error = validationError || saveProfileError;
        let message = '';

        if (validationError) message = validationErrorMessage;
        else if (saveProfileError) message = saveProfileErrorMessage;

        return (
            <Toast
                visible={error}
                color="#CC0000"
                message={message}
                onDismiss={this.clearErrors}
            />
        );
    };

    render() {
        const {
            prevDisabled,
            nextDisabled,
            activeTabIndex,
            tabs,
            saveProfile
        } = this.state;
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                pressable={false}
            >
                <>
                    <Container>
                        {activeTabIndex > -1 && (
                            <IconButton
                                disabled={prevDisabled || saveProfile.loading}
                                icon="keyboard-arrow-left"
                                size={32}
                                color="#6a1b9a"
                                onPress={() => this.handleTabSwitch('prev')}
                            />
                        )}
                        {activeTabIndex === -1 && this.renderInitTab()}
                        {activeTabIndex < tabs.length &&
                            activeTabIndex > -1 && (
                                <ActionContainer
                                    activeTabIndex={activeTabIndex}
                                    tabs={tabs}
                                    handleInputChange={this.handleInputChange}
                                />
                            )}
                        {activeTabIndex < tabs.length && (
                            <IconButton
                                disabled={nextDisabled}
                                icon="keyboard-arrow-right"
                                size={32}
                                color="#6a1b9a"
                                onPress={() => this.handleTabSwitch('next')}
                            />
                        )}
                        {activeTabIndex === tabs.length && this.renderSaveTab()}
                    </Container>
                    {this.renderError()}
                </>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(
    mapStateToProps,
    { setProfile }
)(CreateProfile);
