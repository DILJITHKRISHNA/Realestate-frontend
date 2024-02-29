import axios from 'axios'
const baseUrl = import.meta.env.VITE_OWNERURL
import { GenerateError } from "../toast/GenerateError"


const ownerRequest = axios.create({
    baseURL: baseUrl
})

ownerRequest.interceptors.request.use((req) => {
    if (localStorage.getItem("ownertok")) {
        req.headers.authorization = localStorage.getItem("ownertok")
    }
    return req
})
ownerRequest.interceptors.response.use((response) =>
    response, (error) => {
        console.log(error.response, "error response token expr");
        if (error.response && error.response.status === 401) {
            GenerateError(error.response.data.message)
            setTimeout(() => {
                localStorage.removeItem("ownertok")
                window.location = "/owner/login"
            }, 2000)
        } else if (error.response && error.response.status === 403) {
            GenerateError(error.response.data.message)
            setTimeout(() => {
                localStorage.removeItem("ownertok")
                window.location = "/owner/login"
            }, 2000)
        }
    }
)
export default ownerRequest