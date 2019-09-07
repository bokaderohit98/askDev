import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import store from '../redux/store';
import { login } from '../redux/api';
import * as actions from '../redux/actions';

class AuthService {
    constructor() {
        this.storage = AsyncStorage;
    }

    init = (email, password, jwt) => {
        this.storage.setItem('email', email);
        this.storage.setItem('password', password);
        this.storage.setItem('jwt', jwt);
    };

    validateToken = async () => {
        const jwt = await this.getToken();
        const user = jwtDecode(jwt);
        const expiryTime = user.exp * 1000;
        if (expiryTime - 10 ** 5 < new Date().valueOf()) return this.refreshToken();
        return Promise.resolve();
    };

    refreshToken = async () => {
        const email = await this.storage.getItem('email');
        const password = await this.storage.getItem('password');
        this.login(email, password);
    };

    getToken = async () => {
        const jwt = await this.storage.getItem('jwt');
        return jwt;
    };

    login = (email, password) => {
        store.dispatch(login(email, password, this));
    };

    makeSecureRequest = async request => {
        await this.validateToken();
        const jwt = await this.getToken();
        return request(jwt);
    };

    logout = () => {
        store.dispatch({
            type: actions.LOGOUT
        });
        this.storage.clear();
    };

    logger = async () => {
        const keys = await this.storage.getAllKeys();
        const values = await this.storage.multiGet(keys);
        console.log(values);
    };
}

export default AuthService;
