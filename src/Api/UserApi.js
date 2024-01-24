import axios from 'axios'


const UserApi = axios.create({
    baseURL: 'http://localhost:5000',
})

export async function userLogin(LoginData) {
    try {
        console.log(LoginData, "dataa from userlogin inside API");
        const res = await UserApi.post('/login', LoginData)
        console.log(res, "response from userLogin inside Api");
    } catch (error) {
        console.log(error.message);
    }
}

export async function userSignUp(SignUpData){
    try {
        const SignUpRes = await UserApi.post('/signup',SignUpData)
        return SignUpRes;
    } catch (error) {
        console.log(error.message);
    }
}