import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Conainer = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const App = () => {
    return (
        <Conainer>
            <Text>Hello Native!</Text>
        </Conainer>
    );
};

export default App;
