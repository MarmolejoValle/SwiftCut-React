import axios from "axios";


const SERVER_URL = import.meta.VITE_APP_SERVER_URL;
const APP_JSON = 'aplication/JSON';
const AxiosClient = axios.create({
    baseURL: SERVER_URL
});

const requestHandlery = (req) => {
    req.headers['Accept'] = APP_JSON;
    req.headers['Content-Type'] = APP_JSON;
    const session = JSON.parse(localStorage.getItem('user'));
    if (session?.token) req.headers['Authorization'] = `Bearer ${session.token}`;
    return req;
}

AxiosClient.interceptors.request.use(
    (req) => requestHandlery(req),
    (err) => Promise.reject(err)
)
AxiosClient.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
)
export default AxiosClient;