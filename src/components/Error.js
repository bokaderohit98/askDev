import React from 'react';
import styled from 'styled-components';
import { View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import ErrorImage from '../assets/error.png';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => (
    <Container>
        <Image source={ErrorImage} />
        <Title>Oops Something Went Wrong!</Title>
    </Container>
);
