import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/redux/store';
import App from './src';

export default () => {
    return (
        <ReduxProvider store={store}>
            <PaperProvider>
                <App />
            </PaperProvider>
        </ReduxProvider>
    );
};
