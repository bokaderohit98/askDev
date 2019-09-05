import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Container = styled.View`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

class Experience extends Component {
    render() {
        return (
            <Container>
                <Text>Experience</Text>
            </Container>
        );
    }
}

export default Experience;
