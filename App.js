import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { StatusBar } from 'react-native';
import store from './src/redux/store';
import App from './src';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0000ff'
    }
};

export default () => {
    return (
        <ReduxProvider store={store}>
            <PaperProvider theme={theme}>
                <StatusBar barStyle="dark-content" backgroundColor="white" />
                <App />
            </PaperProvider>
        </ReduxProvider>
    );
};
