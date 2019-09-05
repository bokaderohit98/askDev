import React from 'react';
import { DoubleBounce } from 'react-native-loader';
import styled from 'styled-components';
import { View } from 'react-native';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({ size = 30 }) => (
    <Container>
        <DoubleBounce size={size} color="#673ab7" />
    </Container>
);
