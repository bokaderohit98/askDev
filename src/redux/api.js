import jwtDecode from 'jwt-decode';
import { AsyncStorage } from 'react-native';
import * as actions from './actions';
import axios from '../utils/axios';
import routes from '../utils/routes';

export const login = (email, password, authService) => dispatch => {
    dispatch({ type: actions.LOGIN_USER_BEGIN });
    axios
        .post(routes.login, {
            email,
            password
        })
        .then(async res => {
            const jwt = res.data.token.split(' ')[1];
            dispatch({
                type: actions.LOGIN_USER_SUCCESS,
                payload: {
                    user: jwtDecode(jwt)
                }
            });
            console.log('service', authService);
            console.log('service name', authService.name);
            authService.init(email, password, jwt);
            authService.logger();
        })
        .catch(err => {
            dispatch({
                type: actions.LOGIN_USER_ERROR,
                payload: {
                    error: 'Invalid Credentials'
                }
            });
        });
};

export const clearSuccess = () => dispatch => {
    dispatch({
        type: actions.CLEAR_SUCCESS
    });
};

export const clearError = () => dispatch => {
    dispatch({
        type: actions.CLEAR_ERROR
    });
};
