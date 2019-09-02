import React from 'react';
import { Snackbar, Subheading } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    Snackbar: {
        backgroundColor: '#CC0000',
        margin: 0,
        height: 54
    },

    SnackbarText: {
        color: '#ffffff',
        textAlign: 'center'
    }
});

const Toast = ({ visible, message, color, onDismiss }) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            style={{ ...style.Snackbar, backgroundColor: color }}
            duration={Snackbar.DURATION_SHORT}
        >
            <Subheading style={style.SnackbarText}>{message}</Subheading>
        </Snackbar>
    );
};

export default Toast;
