import * as actions from './actions';

const reducer = (state = {}, { type, payload }) => {
    switch (type) {
        case actions.LOGIN_USER_BEGIN:
            return {
                ...state,
                loginLoading: true,
                loginSuccess: false,
                loginError: false,
                loginErrorMessage: ''
            };
        case actions.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginError: false,
                user: payload.user,
                isAuthenticated: true
            };
        case actions.LOGIN_USER_ERROR:
            return {
                ...state,
                loginLoading: false,
                loginError: true
            };
        case actions.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                profile: payload.profile,
                loginError: false
            };
        case actions.SET_PROFILE:
            return {
                ...state,
                profile: payload.profile
            };
        case actions.CLEAR_SUCCESS:
            return { ...state };
        case actions.CLEAR_ERROR:
            return { ...state, loginError: false };
        case actions.LOGOUT:
            return {
                user: null,
                isAuthenticated: false,
                profile: null
            };
        default:
            return state;
    }
};

export default reducer;
