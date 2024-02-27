import axios from 'axios'
const baseUrl = import.meta.env.VITE_ADMINURL

const adminRequest = axios.create({
    baseURL: baseUrl
})

adminRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("admintok")){
        req.headers.authorization = localStorage.getItem("admintok")
    }
    return req
})
export default adminRequest