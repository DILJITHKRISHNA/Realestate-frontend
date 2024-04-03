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

export async function FetchData(id) {
    console.log("entert to fetch dataaa in apiii");
    try {
        const response = await userRequest.get(`/property/${id}`);
        console.log(response, "respnse in fetchdataa proeptuuu apii");
        return response;
    } catch (error) {
        console.log(error);
    }
}
export async function FetchPropertyData() {
    console.log("entert to FetchPropertyData in apiii");
    try {
        const response = await userRequest.get('/property');
        console.log(response, "respnse in FetchPropertyData  apii");
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
export async function SuccessRequest(bookData, id ,userId, ownerId) {
    try {
        const res = await userRequest.post(`/property/success/${id}`, { data:  bookData, userId : userId, ownerId: ownerId })
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
export async function PaginateProperty(currentPage, propertyType, searchTitle, searchLocation, priceRange) {
    try {
        const res = await userRequest.get(`/properties/${currentPage}/${propertyType}/${searchTitle}/${searchLocation}/${priceRange.min}/${priceRange.max}`);
        console.log(res, "res in PaginateProperty apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function propertiesData(id) {
    console.log(id, "propertiesData ");
    try {
        const res = await userRequest.get(`/propertiesData/${id}`);
        console.log(res, "res in propertiesData apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function SaveProperty(name, type, rent, ownerId, imageUrls, userRef) {
    try {
        const res = await userRequest.post('/wishlist', {name, type, rent, ownerId, imageUrls, userRef});
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function WishlistData() {
    try {
        const res = await userRequest.get('/wishlistdata');
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
export async function NewProfileData(formData, id) {
    console.log(formData, "NewProfileData ");
    try {
        const res = await userRequest.put(`/editprofile/${id}`, formData);
        console.log(res, "res in NewProfileData apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function PropertyReserve(propertyId, reserveData, userId, ownerId) {
    console.log(reserveData, "PropertyReserve ");
    try {
        const res = await userRequest.post(`/reserve/${propertyId}`, {reserveData, userId, ownerId});
        console.log(res, "res in PropertyReserve apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function FetchEnquiry(userId) {
    console.log( "FetchEnquiry ");
    try {
        const res = await userRequest.get(`/enquiry/${userId}`);
        console.log(res, "res in FetchEnquiry apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function ShareProperty(share, propId) {
    console.log(propId,share, "ShareProperty ");
    try {
        const res = await userRequest.post(`/shareproperty/${propId}`, share);
        console.log(res, "res in ShareProperty apii");
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function FetchCategory() {
    console.log('FetchCategory user');
    try {
        const response = await userRequest.get('/fetchcategory');
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function walletPayment(propertyId, userId, name, contact, email, re_locationDate, ownerId) {
    console.log(propertyId, userId,'walletPayment user');
    console.log(name, contact, email, re_locationDate,'data');
    try {
        const response = await userRequest.put('/walletpayment',{propId: propertyId, userId: userId, ownerId: ownerId, data: {name: name, contact: contact, email: email, re_locationDate: re_locationDate}});
        return response
    } catch (error) {
        console.log(error);
    }
}

export async function FetchWalletHistory() {
    console.log('FetchWalletHistory user');
    try {
        const response = await userRequest.get('/wallethistory');
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function fetchAllowner() {
    console.log('fetchAllowner user');
    try {
        const response = await userRequest.get('/getchatowners');
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function getUser(data) {
    console.log(data,'getuser');
    try {
        const response = await userRequest.get(`/getuser/${data._id}`);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function getOwner(id) {
    console.log( id,"getOwner ");
    try {
        const res = await userRequest.get(`/profile/${id}`);
        console.log(res, "res in getOwner apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function resetPassword(id, details) {
    try {
        const res = await userRequest.patch(`/resetsecurity/${id}`, details);
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function userChats(userId) {
    try {
        const response = await userRequest.get(`/chat/${userId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function ownerChats(ownerId) {
    console.log(ownerId,"11111111111111111111111111");
    try {
        const response = await userRequest.get(`/chat/getownerchat/${ownerId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function getMessages(chatId) {
    try { 
        const response = await userRequest.get(`/message/chat/${chatId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function addMessages(text) {
    console.log(text,"iddd chatddd");
    try {
        const response = await userRequest.post('/message/chat', text);
        return response
    } catch (error) {
        console.log(error);
    }
}
export async function createUserChat(senderId, receiverId) {
    console.log(senderId, receiverId,"createUserChat");
    try {
        const response = await userRequest.post(`/chat/${senderId}/${receiverId}`);
        return response
    } catch (error) {
        console.log(error);
    }
}
