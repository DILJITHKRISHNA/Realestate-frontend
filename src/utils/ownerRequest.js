import axios from 'axios'
const baseUrl = import.meta.env.VITE_OWNERURL

const ownerRequest = axios.create({
    baseURL: baseUrl
})

ownerRequest.interceptors.request.use((req)=> {
    if(localStorage.getItem("ownertok")){
        req.headers.authorization =  localStorage.getItem("ownertok")
    }
    return req
})
export default ownerRequest