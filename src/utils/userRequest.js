import axios from 'axios'
const baseUrl = import.meta.env.VITE_USERURL
import { GenerateError } from "../toast/GenerateError"
const userRequest = axios.create({
    baseURL: baseUrl
})

userRequest.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.authorization = localStorage.getItem("token")
    }
    return req
})
userRequest.interceptors.response.use((response) =>
    response, (error) => {
        console.log(error.response, "error response token expr");
        if (error.response && error.response.status === 401) {
            GenerateError(error.response.data.message)
            setTimeout(() => {
                localStorage.removeItem("token")
                window.location = "/login"
            }, 2000)
        } else if (error.response && error.response.status === 403) {
            GenerateError(error.response.data.message)
            setTimeout(() => {
                localStorage.removeItem("token")
                window.location = "/login"
            }, 2000)
        }
    }
)
export default userRequest