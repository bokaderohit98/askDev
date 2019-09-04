import React, { Component } from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

class Developers extends Component {
    render() {
        return (
            <Container>
                <Text>developers</Text>
            </Container>
        );
    }
}

export default Developers;
