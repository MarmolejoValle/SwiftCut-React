import axios from "axios";


const SERVER_URL = "http://localhost:8080"
const APP_JSON = 'application/JSON';
const MULTIPART_FORM_DATA = 'multipart/form-data';

export const AxiosClientJSON = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Accept': APP_JSON,
        'Content-Type': APP_JSON
    }
});


// Cliente Axios para multipart/form-data
export const AxiosClientFormData = axios.create({
    baseURL: SERVER_URL,
    headers: {
        
        'Content-Type': MULTIPART_FORM_DATA
    }
});
// Interceptores para el cliente Axios JSON
AxiosClientJSON.interceptors.request.use(
    (req) => requestHandler(req),
    (err) => Promise.reject(err)
)

AxiosClientJSON.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
)

// Interceptores para el cliente Axios multipart/form-data
AxiosClientFormData.interceptors.request.use(
    (req) => requestHandler(req),
    (err) => Promise.reject(err)
)

AxiosClientFormData.interceptors.response.use(
    (res) => Promise.resolve(res.data),
    (err) => Promise.reject(err)
)

const requestHandler = (req) => {
    const token = sessionStorage.getItem('token');
    if (token) req.headers['Authorization'] = `Bearer ${token}`;
    return req;
}