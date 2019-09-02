import axios from 'axios';

const api = axios.create({
    baseURL: 'http://askdeveloper.herokuapp.com/api'
});

api.interceptors.request.use(req => {
    console.log(req);
    return req;
});

api.interceptors.response.use(res => {
    console.log(res);
    return res;
});

export default api;
