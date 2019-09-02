import React from 'react';
import styled from 'styled-components';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

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

const renderFormGroup = (formGroup = [], inputs = {}) => {
    const { width } = Dimensions.get('screen');
    const values = Object.keys(inputs).map(key => inputs[key]);
    return formGroup.map((item, i) => (
        <TextInput
            key={item.label}
            label={item.label}
            value={values[i]}
            onChangeText={item.onChangeText}
            style={{ ...style.Input, width: width - 20 }}
        />
    ));
};

export {
    Container,
    CloseContainer,
    FormContainer,
    Message,
    style,
    renderFormGroup
};
