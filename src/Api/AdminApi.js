import axios, { Axios } from 'axios'



const AdminApi = axios.create({
    baseURL: 'http://localhost:5000/admin'
})


export async function AdminLogin(AdminLoginData) {
    console.log("entered to adminapiii loginnnn");
    try {
        console.log(AdminLoginData, "adminlogin dataaaaaaaaaaaaaa");
        const res = await AdminApi.post('/admin/login', AdminLoginData)
        console.log(res, "responseeeeeee from admin login apiiiiiii");
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export async function FetchUserDetails(userData) {
    try {
        const result = await AdminApi.get("/users", userData)
        console.log(result, "response from apiiiii");
        return result
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchOwnerData(ownerData) {
    try {
        const response = await AdminApi.get('/owners', ownerData)
        console.log(response, "response from admi apii ownerrr");
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function categoryTypes(categoryData) {
    console.log(categoryData,"yyyyyyyyyy");
    try {
        const ResApi = await AdminApi.post('/admin/category', categoryData)
        return ResApi
    } catch (error) {
        console.log(error);
    }
}

export async function FetchCategory() {
    try {
        const res = await AdminApi.get('/category')
        console.log(res, "ress in apiiiiiii cat fetch");
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function UserBlockUnBlock(id) {
    try {
        const result = await AdminApi.post(`/admin/userlist/${id}`)
        console.log(result,"resukltttttttttttttttt");
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function OwnerBlockUnBlock(OwnerId) {
    console.log(OwnerId,"id in apiiii")
    try {
        const result = await AdminApi.post(`/admin/ownerlist/${OwnerId}`)
        console.log(result,"resukltttttttttttttttt");
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function kycList(){
    console.log("apiiiiiiiiiii");
    try {
        const res = await AdminApi.get('/kyclist')
        console.log(res,"responseeeeeeeeeeee");
        console.log(res,"response from kyclist apiii");
        return res
    } catch (error) {
        console.log(error);
    }
}


export async function approveOwner(kycId){
    try {
        const res = await AdminApi.get(`/approveKyc/${kycId}`)
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function blockCategory(id){
    try {
        const result = await AdminApi.post(`/admin/category/${id}`)
        console.log(result,"rstttt");
        return result
    } catch (error) {
        console.log(error);
    }
}