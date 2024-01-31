import axios from 'axios'


const UserApi = axios.create({
    baseURL: 'http://localhost:5000',
})

export async function userLogin(LoginData) {
    try {
        console.log(LoginData, "dataa from userlogin inside API");
        const res = await UserApi.post('/login', LoginData);
        console.log(res, "response from userLogin inside Api");
        return res;  
    } catch (error) {
        console.log(error);
        throw error;  
    }
}
export async function userSignUp(SignUpData) {
    try {
        const SignUpRes = await UserApi.post('/signup', SignUpData)
        console.log(SignUpRes, "pppppppppppllllllll");
        return SignUpRes;
    } catch (error) {
        console.log(error.message);
    }
}

export async function userVerifyOtp(userOtp) {
    try {
        console.log(userOtp,'ghfgju');
        const data = await UserApi.post('/verifyotp', userOtp)
        return data
    } catch (error) {
        console.log(error.message);
    }

}
export async function ManageUserOtp(userMail) {
    try {
        console.log(userMail,"usermail fron manageprpoperety");
        const data = await UserApi.post('/send-otp', userMail)
        return data
    } catch (error) {
        console.log(error.message);
    }

}

export async function userPass(forgotData){
    console.log(forgotData,"forgot dataaaaaaaa");
    try {
        const result = await UserApi.post('/forgotPassword', forgotData)
        console.log(result,'resultttttttt');
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function NewPassword(newPass){
    console.log(newPass,"ppppppppppppp apiiii");
    try {
        const result = await UserApi.post("/resetpassword", newPass)
        console.log(result,"resuuuu");
        return result
    } catch (error) {
        console.log(error);
    }
}