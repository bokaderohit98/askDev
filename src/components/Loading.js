import React from 'react';
import { DoubleBounce } from 'react-native-loader';
import styled from 'styled-components';

const Container = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export default ({ size = 30 }) => (
    <Container>
        <DoubleBounce size={size} color="#0000ff" />
    </Container>
);
