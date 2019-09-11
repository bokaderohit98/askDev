import React, { Component } from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { StatusBar, NetInfo } from 'react-native';
import { store, persistor } from './src/redux/store';
import { NoConnection } from './src/components';
import App from './src';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0000ff'
    }
};

export default class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: false
        };
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(this.handleConnectionChange());
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = isConnected => {
        this.setState({
            isConnected
        });
    };

    render() {
        const { isConnected } = this.state;
        return (
            <>
                {!isConnected && <NoConnection />}
                {isConnected && (
                    <ReduxProvider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <PaperProvider theme={theme}>
                                <StatusBar barStyle="dark-content" backgroundColor="white" />
                                <App />
                            </PaperProvider>
                        </PersistGate>
                    </ReduxProvider>
                )}
            </>
        );
    }
}
