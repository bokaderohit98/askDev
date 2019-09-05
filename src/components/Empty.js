import React from 'react';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import EmptyImage from '../assets/empty.png';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({ children }) => (
    <Container>
        <Image source={EmptyImage} />
        <Title>{children}</Title>
    </Container>
);
