import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

class LoginScreen extends Component {
    render() {
        return (
            <Container>
                <Text>Login Screen</Text>
            </Container>
        );
    }
}

export default LoginScreen;
