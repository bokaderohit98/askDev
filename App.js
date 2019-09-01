import React from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Container>
      <Text>Open up App.js to start working on your project!</Text>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
