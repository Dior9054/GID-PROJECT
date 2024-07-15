
import axios from "axios";

const URL = import.meta.env.VITE_PUBLIC_MY_BASE_URL
const API = axios.create({ baseURL: URL })
const AUTHAPI = axios.create({ baseURL: URL })

AUTHAPI.interceptors.request.use((request) => {
    let token = localStorage.getItem('token')
    if (request.headers) {
        if (token) {
            request.headers.Authorization = `Token ${token}`;
        }
    }
    return request;
});

// AUTHAPI.interceptors.response.use((response) => {
//     return Promise.resolve(response)
// }, (error) => {
//     if (error?.response.status == 401) {
//         localStorage.clear()
//         window.location.href = '/login'
//     } else if (error?.response.status == 404) {
//         window.location.href = "/404"
//     }
//     return Promise.reject(error)
// });

export default API
export { AUTHAPI }


