import jwtDecode from 'jwt-decode';
import * as actions from './actions';
import axios from '../utils/axios';
import routes from '../utils/routes';

export const login = (email, password) => dispatch => {
    dispatch({ type: actions.LOGIN_USER_BEGIN });
    return axios
        .post(routes.login, {
            email,
            password
        })
        .then(res => {
            dispatch({
                type: actions.LOGIN_USER_SUCCESS,
                payload: {
                    user: jwtDecode(res.data.token.split(' ')[1])
                }
            });
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
