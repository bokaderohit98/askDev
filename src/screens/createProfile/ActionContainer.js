import React, { Component } from 'react';
import styled from 'styled-components';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Menu, Button, Chip } from 'react-native-paper';
import * as types from './tabTypes';

const Container = styled.ScrollView``;

const MultiInputItemContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
`;

const Message = styled.Text`
    align-items: center;
    font-size: 32px;
    padding: 16px;
`;

const style = StyleSheet.create({
    Input: {
        backgroundColor: '#ffffff',
        width: Dimensions.get('screen').width - 100
    },
    SelectButton: {
        width: Dimensions.get('screen').width - 100
    },
    MultiIntputItem: {
        margin: 4
    }
});

class ActionContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProfessionMenu: false
        };
    }

    toggleProfessionMenu = () => {
        const { showProfessionMenu } = this.state;
        this.setState({
            showProfessionMenu: !showProfessionMenu
        });
    };

    handleOptionSelection = option => {
        const { handleInputChange } = this.props;
        handleInputChange(option);
        this.toggleProfessionMenu();
    };

    removeMultiInputItem = (items, index) => {
        const updated = items.filter((item, i) => i !== index);
        const { handleInputChange } = this.props;
        handleInputChange(updated.join(' '));
    };

    renderTab = () => {
        const { activeTabIndex, tabs } = this.props;
        const { type } = tabs[activeTabIndex];
        switch (type) {
            case types.INPUT:
                return this.renderInputTab();
            case types.MULTILINE_INPUT:
                return this.renderInputTab(true);
            case types.MULTIPLE_INPUT:
                return this.renderMultipleInputTab();
            case types.SELECT:
                return this.renderSelectTab();
            default:
                return null;
        }
    };

    renderSelectTab = () => {
        const { activeTabIndex, tabs, handleInputChange } = this.props;
        const { showProfessionMenu } = this.state;
        const { options, value } = tabs[activeTabIndex];
        const menuItems = options.map(option => (
            <Menu.Item
                key={option}
                onPress={() => this.handleOptionSelection(option)}
                title={option}
            />
        ));
        return (
            <Menu
                visible={showProfessionMenu}
                onDismiss={this.toggleProfessionMenu}
                anchor={
                    <Button
                        mode="outlined"
                        onPress={this.toggleProfessionMenu}
                        style={style.SelectButton}
                        uppercase={false}
                    >
                        {value.length > 0 ? value : 'Profession'}
                    </Button>
                }
            >
                {menuItems}
            </Menu>
        );
    };

    renderMultipleInputTab = () => {
        const { activeTabIndex, tabs, handleInputChange } = this.props;
        const { value, placeholder } = tabs[activeTabIndex];
        const filteredSkills = value.split(' ').filter(skill => skill !== '');
        const skills = filteredSkills.map((skill, index) => (
            <Chip
                key={skill + index}
                mode="outlined"
                onClose={() => this.removeMultiInputItem(filteredSkills, index)}
                style={style.MultiIntputItem}
            >
                {skill}
            </Chip>
        ));
        return (
            <>
                <MultiInputItemContainer>{skills}</MultiInputItemContainer>
                <TextInput
                    style={style.Input}
                    mode="outlined"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleInputChange}
                />
            </>
        );
    };

    renderInputTab = multiline => {
        const { activeTabIndex, tabs, handleInputChange } = this.props;
        const { placeholder, value } = tabs[activeTabIndex];
        return (
            <TextInput
                style={style.Input}
                mode="outlined"
                multiline={multiline}
                numberOfLines={multiline ? 10 : 1}
                placeholder={placeholder}
                value={value}
                onChangeText={handleInputChange}
            />
        );
    };

    render() {
        const { activeTabIndex, tabs } = this.props;
        return (
            <Container>
                <Message>{tabs[activeTabIndex].message}</Message>
                {this.renderTab()}
            </Container>
        );
    }
}

export default ActionContainer;
