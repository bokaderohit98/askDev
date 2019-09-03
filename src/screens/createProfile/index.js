import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import styled from 'styled-components';
import tabsSchema from './tabsSchema';
import ActionContainer from './ActionContainer';

const Container = styled.View`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

const SaveContainer = styled.View`
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
            activeTabIndex: 0,
            tabs: tabsSchema,
            nextDisabled: false,
            prevDisabled: true
        };
    }

    componentDidMount() {
        const { tabs } = this.state;
        const { required, value } = tabs[0];
        if (required && value === '') this.setState({ nextDisabled: true });
    }

    handleTabSwitch = event => {
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

    renderSaveTab = () => {
        return (
            <SaveContainer>
                <Message>Let's save your profile!</Message>
                <Button mode="outlined" onPress={() => console.log('saved')}>
                    Save Profile
                </Button>
            </SaveContainer>
        );
    };

    render() {
        const { prevDisabled, nextDisabled, activeTabIndex, tabs } = this.state;
        return (
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                pressable={false}
            >
                <Container>
                    <IconButton
                        disabled={prevDisabled}
                        icon="keyboard-arrow-left"
                        size={32}
                        color="#6a1b9a"
                        onPress={() => this.handleTabSwitch('prev')}
                    />
                    {activeTabIndex < tabs.length && (
                        <>
                            <ActionContainer
                                activeTabIndex={activeTabIndex}
                                tabs={tabs}
                                handleInputChange={this.handleInputChange}
                            />
                            <IconButton
                                disabled={nextDisabled}
                                icon="keyboard-arrow-right"
                                size={32}
                                color="#6a1b9a"
                                onPress={() => this.handleTabSwitch('next')}
                            />
                        </>
                    )}
                    {activeTabIndex === tabs.length && this.renderSaveTab()}
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateProfile;
