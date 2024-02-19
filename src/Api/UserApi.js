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
        console.log(userOtp, 'ghfgju');
        const data = await UserApi.post('/verifyotp', userOtp)
        return data
    } catch (error) {
        console.log(error.message);
    }

}
export async function ManageUserOtp(userMail) {
    try {
        console.log(userMail, "usermail fron manageprpoperety");
        const data = await UserApi.post('/send-otp', userMail)
        return data
    } catch (error) {
        console.log(error.message);
    }

}

export async function userPass(forgotData) {
    console.log(forgotData, "forgot dataaaaaaaa");
    try {
        const result = await UserApi.post('/forgotPassword', forgotData)
        console.log(result, 'resultttttttt');
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function NewPassword(newPass) {
    try {
        const result = await UserApi.post("/resetpassword", newPass)
        console.log(result, "resuuuu");
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function userRegisterGoogle(userData) {
    console.log(userData, "dtataaa apiii");
    try {
        const response = await UserApi.post("/userRegisterWithGoogle", userData);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function userLoginGoogle(userData) {
    console.log(userData, "dtataaa apiii");
    try {
        const response = await UserApi.post("/userLoginWithGoogle", userData);
        console.log(response, "rip");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function FetchData(id) {
    console.log("entert to fetch dataaa in apiii");
    try {
        const response = await UserApi.get('/property');
        console.log(response, "respnse in fetchdataa proeptuuu apii");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function SingleData(id) {
    console.log(id,'enter to contrr getDataa');
    try {
        const res = await UserApi.get(`/property/:id`)
        console.log(res, " got res in singledataaaa function inside userappiii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function IsBooked(id) {
    try {
        const res = await UserApi.post(`/property/bookproperty/${id}`)
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function BookingData(PaymentDetails, id) {
    try {
        const res = await UserApi.post(`/property/payment/${id}`,PaymentDetails)
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function paymentRequest(propertyId) {
    try {
        const res = await UserApi.post(`/property/paymentreq/${propertyId}`)
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function SuccessRequest(bookData, id) {
    try {
        const res = await UserApi.post(`/property/success/${id}`,{data: bookData})
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function FetchPaymentData() {
    console.log("fetch payment dataaa");
    try {
        const res = await UserApi.get('/paymenthistory')
        console.log(res, "res in is fetch payment historyy apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function CancelBookPayment(id, propId) {
    console.log(propId,"fetch payment dataaa");
    try {
        const res = await UserApi.post(`/paymenthistory/${id}`, propId)
        console.log(res, "res in is fetch payment historyy apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
  