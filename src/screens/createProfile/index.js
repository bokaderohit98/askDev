import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import styled from 'styled-components';
import tabsSchema from './tabsSchema';
import tabValidations from './tabValidations';
import ActionContainer from './ActionContainer';
import Toast from '../../components/Toast';

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
        this.state = {
            activeTabIndex: -1,
            tabs: tabsSchema,
            nextDisabled: false,
            prevDisabled: true,
            tabValidation: {
                error: false,
                message: ''
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

    renderInitTab = () => {
        return (
            <TabContainer>
                <Message>Let&apos; create your awesome profile!</Message>
            </TabContainer>
        );
    };

    renderSaveTab = () => {
        return (
            <TabContainer>
                <Message>Let&apos; save your profile!</Message>
                <Button mode="outlined" onPress={() => console.log('saved')}>
                    Save Profile
                </Button>
            </TabContainer>
        );
    };

    renderError = () => {
        const { tabValidation } = this.state;
        const { error, message } = tabValidation;
        console.log(tabValidation);
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
        const { prevDisabled, nextDisabled, activeTabIndex, tabs } = this.state;
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                pressable={false}
            >
                <>
                    <Container>
                        {activeTabIndex > -1 && (
                            <IconButton
                                disabled={prevDisabled}
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

export default CreateProfile;
