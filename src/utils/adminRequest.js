import axios from 'axios'
const baseUrl = import.meta.env.VITE_ADMINURL
import { GenerateError } from "../toast/GenerateError"

const adminRequest = axios.create({
    baseURL: baseUrl
})

adminRequest.interceptors.request.use((req) => {
    if (localStorage.getItem("admintok")) {
        req.headers.authorization = localStorage.getItem("admintok")
    }
    return req
})

adminRequest.interceptors.response.use((response) =>
    response, (error) => {
        console.log(error.response, "error response token expr");
        if (error.response && error.response.status === 400) {
            GenerateError(error.response.data.message)
            setTimeout(() => {
                localStorage.removeItem("admintok")
                window.location = "/admin/login"
            }, 2000)
        } else if (error.response && error.response.status === 401) {
            GenerateError(error.response.data.message)
            setTimeout(() => {
                localStorage.removeItem("admintok")
                window.location = "/admin/login"
            }, 2000)
        }
    }
)

export default adminRequest