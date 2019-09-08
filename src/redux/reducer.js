import * as actions from './actions';

const reducer = (state = {}, { type, payload }) => {
    switch (type) {
        case actions.LOGIN_USER_BEGIN:
            return {
                ...state,
                loginLoading: true,
                isAuthenticated: false,
                loginError: false
            };
        case actions.LOGIN_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user
            };
        case actions.LOGIN_USER_ERROR:
            return {
                ...state,
                loginLoading: false,
                loginError: true,
                profileLoading: false
            };
        case actions.FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginError: false,
                profile: payload.profile
            };
        case actions.FETCH_DEVELOPERS_BEGIN:
            return {
                ...state,
                developersLoading: true,
                developers: [],
                developersError: false
            };
        case actions.FETCH_DEVELOPERS_SUCCESS:
            return {
                ...state,
                developersLoading: false,
                developers: payload.developers
            };
        case actions.FETCH_DEVELOPERS_ERROR:
            return {
                ...state,
                developersLoading: false,
                developersError: true,
                developersErrorMessage: payload.message
            };
        case actions.FETCH_POSTS_BEGIN:
            return {
                ...state,
                postsLoading: true,
                postsError: false,
                posts: []
            };
        case actions.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                postsLoading: false,
                posts: payload.posts
            };
        case actions.FETCH_POSTS_ERROR:
            return {
                ...state,
                postsLoading: false,
                posts: [],
                postsError: true,
                postsErrorMessage: payload.message
            };
        case actions.LIKE_POST:
            return {
                ...state,
                posts: payload.posts
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
