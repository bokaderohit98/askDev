import jwtDecode from 'jwt-decode';
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
            authService.init(email, password, jwt);
            authService.logger();
            return jwt;
        })
        .then(jwt => {
            return axios.get(routes.profile, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        })
        .then(res => {
            dispatch({
                type: actions.FETCH_PROFILE_SUCCESS,
                payload: {
                    profile: res.data
                }
            });
        })
        .catch(err => {
            dispatch({
                type: actions.LOGIN_USER_ERROR
            });
        });
};

export const fetchDevelopers = () => dispatch => {
    dispatch({ type: actions.FETCH_DEVELOPERS_BEGIN });
    axios
        .get(routes.fetchDevelopers)
        .then(res => {
            dispatch({
                type: actions.FETCH_DEVELOPERS_SUCCESS,
                payload: {
                    developers: res.data
                }
            });
        })
        .catch(err => {
            dispatch({
                type: actions.FETCH_DEVELOPERS_ERROR,
                payload: {
                    message: 'Unable to fetch Developers'
                }
            });
        });
};

export const fetchPosts = jwt => dispatch => {
    dispatch({ type: actions.FETCH_POSTS_BEGIN });
    axios
        .get(routes.fetchPosts, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        .then(res => {
            dispatch({
                type: actions.FETCH_POSTS_SUCCESS,
                payload: {
                    posts: res.data
                }
            });
        })
        .catch(err => {
            dispatch({
                type: actions.FETCH_POSTS_ERROR,
                payload: {
                    message: 'Some error occurred'
                }
            });
        });
};

export const setProfile = profile => dispatch => {
    dispatch({
        type: actions.FETCH_PROFILE_SUCCESS,
        payload: { profile }
    });
};

export const likePost = posts => dispatch => {
    dispatch({
        type: actions.LIKE_POST,
        payload: {
            posts
        }
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
