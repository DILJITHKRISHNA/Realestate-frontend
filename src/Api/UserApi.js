import axios from 'axios'
import userRequest from "../utils/userRequest";


// const UserApi = axios.create({
//     baseURL: 'http://localhost:5000',
// })

export async function userLogin(LoginData) {
    try {
        console.log(LoginData, "dataa from userlogin inside API");
        const res = await userRequest.post('/login', LoginData);
        console.log(res, "response from userLogin inside Api");
        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function userSignUp(SignUpData) {
    try {
        const SignUpRes = await userRequest.post('/signup', SignUpData)
        console.log(SignUpRes, "pppppppppppllllllll");
        return SignUpRes;
    } catch (error) {
        console.log(error.message);
    }
}

export async function userVerifyOtp(userOtp) {
    try {
        console.log(userOtp, 'ghfgju');
        const data = await userRequest.post('/verifyotp', userOtp)
        return data
    } catch (error) {
        console.log(error.message);
    }

}
export async function ManageUserOtp(userMail) {
    try {
        console.log(userMail, "usermail fron manageprpoperety");
        const data = await userRequest.post('/send-otp', userMail)
        return data
    } catch (error) {
        console.log(error.message);
    }

}

export async function userPass(forgotData) {
    console.log(forgotData, "forgot dataaaaaaaa");
    try {
        const result = await userRequest.post('/forgotPassword', forgotData)
        console.log(result, 'resultttttttt');
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function NewPassword(newPass) {
    try {
        const result = await userRequest.post("/resetpassword", newPass)
        console.log(result, "resuuuu");
        return result
    } catch (error) {
        console.log(error);
    }
}

export async function userRegisterGoogle(userData) {
    console.log(userData, "dtataaa apiii");
    try {
        const response = await userRequest.post("/userRegisterWithGoogle", userData);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function userLoginGoogle(userData) {
    console.log(userData, "dtataaa apiii");
    try {
        const response = await userRequest.post("/userLoginWithGoogle", userData);
        console.log(response, "rip");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function FetchData(id) {
    console.log("entert to fetch dataaa in apiii");
    try {
        const response = await userRequest.get('/property');
        console.log(response, "respnse in fetchdataa proeptuuu apii");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function IsBooked(id) {
    try {
        const res = await userRequest.post(`/property/bookproperty/${id}`)
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function BookingData(PaymentDetails, id) {
    try {
        const res = await userRequest.post(`/property/payment/${id}`, PaymentDetails)
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function paymentRequest(propertyId) {
    try {
        const res = await userRequest.post(`/property/paymentreq/${propertyId}`)
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function SuccessRequest(bookData, id) {
    try {
        const res = await userRequest.post(`/property/success/${id}`, { data: bookData })
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function FetchPaymentData() {
    console.log("fetch payment dataaa");
    try {
        const res = await userRequest.get('/paymenthistory')
        console.log(res, "res in is fetch payment historyy apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function CancelBookPayment(id, propId) {
    console.log(propId, "fetch payment dataaa");
    try {
        const res = await userRequest.post(`/paymenthistory/${id}`, propId)
        console.log(res, "res in is fetch payment historyy apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function resendOTp(email) {
    console.log(email, "resend otpp ");
    try {
        const res = await userRequest.post('/resendotp', email)
        console.log(res, "res in Resend otppp apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function FetchProfileData(id) {
    console.log(id, "FetchProfileData ");
    try {
        const res = await userRequest.get(`/getprofiledata/${id}`)
        console.log(res, "res in FetchProfileData apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function PaginateProperty(currentPage) {
    console.log(currentPage, "PaginateProperty ");
    try {
        const res = await userRequest.get(`/properties/${currentPage}`);
        console.log(res, "res in PaginateProperty apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function SaveProperty(name, type, rent, ownerId, imageUrls) {
    try {
        const res = await userRequest.post('/wishlist', {name, type, rent, ownerId, imageUrls});
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function WishlistData(id) {
    console.log(id, "WishlistData ");
    try {
        const res = await userRequest.get(`/wishlist/${id}`);
        console.log(res, "res in WishlistData apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function addProfileImage(imageUrl, userId) {
    console.log(imageUrl, userId, "addProfileImage ");
    try {
        const res = await userRequest.post(`/profileimage/${userId}`, imageUrl);
        console.log(res, "res in addProfileImage apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
