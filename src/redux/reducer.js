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
                loginLoading: false,
                loginSuccess: true,
                user: payload.user
            };
        case actions.LOGIN_USER_ERROR:
            return {
                ...state,
                loginLoading: false,
                loginError: true,
                loginErrorMessage: payload.error
            };
        case actions.CLEAR_SUCCESS:
            return { ...state, loginSuccess: false };
        case actions.CLEAR_ERROR:
            return { ...state, loginError: false };
        default:
            return state;
    }
};

export default reducer;
