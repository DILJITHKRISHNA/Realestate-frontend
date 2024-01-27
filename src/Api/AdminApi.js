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