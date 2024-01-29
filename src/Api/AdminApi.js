import axios from 'axios'

const AdminApi = axios.create({
    baseURL: 'http://localhost:5000/admin'
})


export async function AdminLogin(AdminLoginData){
    console.log("entered to adminapiii loginnnn");
    try {
        console.log(AdminLoginData,"adminlogin dataaaaaaaaaaaaaa");
        const res = await AdminApi.post('/admin/login', AdminLoginData)
        console.log(res,"responseeeeeee from admin login apiiiiiii");
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export async function FetchUserDetails(userData){
    try {
        const result = await AdminApi.get("/users", userData)
        console.log(result,"response from apiiiii");
        return result
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchOwnerData(ownerData){
    try {
        const response = await AdminApi.get('/owners', ownerData)
        console.log(response,"response from admi apii ownerrr");
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function categoryTypes(categoryData){
    console.log(categoryData,"enter to apiiiii in categoryy");
    try {
        const response = await AdminApi.post('/admin/category', categoryData)
        console.log(response,"response in apiii categoryyyyy");
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function FetchCategory(listCat){
    console.log(listCat,"listcatttttttttttttttttt");
    try {
        const res = await AdminApi.get('/category', listCat)
        return res
    } catch (error) {
        console.log(error);
    }
}