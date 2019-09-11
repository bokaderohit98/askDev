import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StatusBar } from 'react-native';
import { store, persistor } from './src/redux/store';
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
            <PersistGate loading={null} persistor={persistor}>
                <PaperProvider theme={theme}>
                    <StatusBar barStyle="dark-content" backgroundColor="white" />
                    <App />
                </PaperProvider>
            </PersistGate>
        </ReduxProvider>
    );
};
