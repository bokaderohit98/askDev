import React from 'react';
import styled from 'styled-components';
import { Image } from 'react-native';
import { Title } from 'react-native-paper';
import NoConnectionImage from '../assets/noConnection.png';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default () => (
    <Container>
        <Image source={NoConnectionImage} />
        <Title>Oops No Internet Connection!</Title>
    </Container>
);
