import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
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

    handleTabSwitch = event => {
        let { activeTabIndex, tabs } = this.state;
        let nextDisabled = false;
        let prevDisabled = false;
        if (event === 'prev') {
            activeTabIndex -= 1;
            if (activeTabIndex === 0) prevDisabled = true;
        } else if (event === 'next') {
            activeTabIndex += 1;
            if (activeTabIndex === tabs.length - 1) nextDisabled = true;
        }
        this.setState({ activeTabIndex, prevDisabled, nextDisabled });
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
                    <ActionContainer
                        activeTabIndex={activeTabIndex}
                        tabs={tabs}
                    />
                    <IconButton
                        disabled={nextDisabled}
                        icon="keyboard-arrow-right"
                        size={32}
                        color="#6a1b9a"
                        onPress={() => this.handleTabSwitch('next')}
                    />
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}

export default CreateProfile;
