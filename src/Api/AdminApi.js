import axios, { Axios } from 'axios'
import adminRequest from "../utils/adminRequest.js"


// const AdminApi = axios.create({
//     baseURL: 'http://localhost:5000/admin'
// })


export async function AdminLogin(AdminLoginData) {
    console.log("entered to adminapiii loginnnn");
    try {
        console.log(AdminLoginData, "adminlogin dataaaaaaaaaaaaaa");
        const res = await adminRequest.post('/admin/login', AdminLoginData)
        console.log(res, "responseeeeeee from admin login apiiiiiii");
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export async function FetchUserDetails(userData) {
    try {
        const result = await adminRequest.get("/users", userData)
        console.log(result, "response from apiiiii");
        return result
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchOwnerData(ownerData) {
    try {
        const response = await adminRequest.get('/owners', ownerData)
        console.log(response, "response from admi apii ownerrr");
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function categoryTypes(categoryData) {
    console.log(categoryData,"yyyyyyyyyy");
    try {
        const ResApi = await adminRequest.post('/admin/category', categoryData)
        return ResApi
    } catch (error) {
        console.log(error);
    }
}

export async function FetchCategory() {
    try {
        const res = await adminRequest.get('/category')
        console.log(res, "ress in apiiiiiii cat fetch");
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function UserBlockUnBlock(id) {
    try {
        const result = await adminRequest.post(`/admin/userlist/${id}`)
        console.log(result,"resukltttttttttttttttt");
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function OwnerBlockUnBlock(OwnerId) {
    console.log(OwnerId,"id in apiiii")
    try {
        const result = await adminRequest.post(`/admin/ownerlist/${OwnerId}`)
        console.log(result,"resukltttttttttttttttt");
        return result
    } catch (error) {
        console.log(error);
    }
}


export async function kycList(){
    console.log("apiiiiiiiiiii");
    try {
        const res = await adminRequest.get('/kyclist')
        console.log(res,"responseeeeeeeeeeee");
        console.log(res,"response from kyclist apiii");
        return res
    } catch (error) {
        console.log(error);
    }
}


export async function approveOwner(kycId){
    try {
        const res = await adminRequest.get(`/approveKyc/${kycId}`)
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function blockCategory(id){
    try {
        const result = await adminRequest.post(`/admin/category/${id}`)
        console.log(result,"rstttt");
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function ListProperty(){
    try {
        const response = await adminRequest.get(`/propertylist`)
        console.log(response,"res in list property admin apiii");
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function PropertyStatus(id, action) {
    try {
        console.log(id, 'ppppppppppp');
        const response = await adminRequest.post(`/propertystatus/${id}`, { action }); 
        console.log(response, "res in status property admin apiii");
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function FetchBookingData() {
    try {
      const response = await adminRequest.get('/bookingsdata'); 
      console.log(response, "res in fetchBookingData admin apiii");
      return response;
    } catch (error) {
        console.log(error);
    }
}
  
export async function PropertGet(id){
    console.log(id,"idd in aopiiii");
    try {
        const response = await adminRequest.get(`/propertylist/${id}`)
        console.log(response,"res in property Get admin apiii");
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function EditCat(id, category){
    console.log(id,"idd in edit cat aopiiii");
    try {
        const response = await adminRequest.post(`/admin/editcategory/${id}`, category);
        console.log(response,"res in edit cat admin apiii");
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function PaginateProperty(currentPage) {
    console.log(currentPage, "PaginateProperty ");
    try {
        const res = await adminRequest.get(`/properties/${currentPage}`);
        console.log(res, "res in PaginateProperty apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
