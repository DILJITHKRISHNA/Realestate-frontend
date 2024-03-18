import ownerRequest from '../utils/ownerRequest'

// const OwnerApi = axios.create({
//     baseURL: 'http://localhost:5000/owner'
// })

export async function OwnerLogin(loginData) {
    try {
        console.log(loginData, "loginndataa");
        const res = await ownerRequest.post('/owner/login', loginData)
        console.log(res, "res from owner login");
        return res

    } catch (error) {
        console.log(error);
    }
}

export async function signUpOwner(signupData) {
    console.log(signupData, "signup data from owner apiii");
    try {
        console.log("hiddfsadfsdfddddddddddddddd");
        const res = await ownerRequest.post('/owner/signup', signupData)
        console.log(res, "response from owner signup");
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export async function manageOwnerOtp(Ownermail) {
    console.log(Ownermail, "otpdataaaaaaaaa");
    try {
        const OwnerData = await ownerRequest.post('/owner/send-otp', Ownermail)
        console.log(OwnerData, "ownerdataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return OwnerData
    } catch (error) {
        console.log(error.message);
    }
}

export async function OwnerverifyOtp(ownerOtp) {
    try {
        console.log(ownerOtp, 'owner otp from ownerverify otp api');
        const data = await ownerRequest.post('/owner/verify-otp', ownerOtp)
        return data
    } catch (error) {
        console.log(error.message);
    }

}
export async function AddKyc(kycData) {
    try {
        const data = await ownerRequest.post('/owner/profile', kycData)
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function ownerRegisterGoogle(ownerData) {
    console.log(ownerData, "dtataaa apiii");
    try {
        const response = await ownerRequest.post("/owner/ownerRegisterWithGoogle", ownerData);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function GetKyc() {
    try {
        const response = await ownerRequest.get('/kyc')
        console.log(response, "kycdataaaaaa response kittiiiiiiiiiii scnnn");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function AddProperty(addProperty, id) {
    console.log(addProperty,id,'[[[[[[[[[[[]]]]]]]]]]]-------------------------------');
    try {
        const response = await ownerRequest.post(`/owner/property/${id}`, addProperty);
        console.log(response," response in oowner apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function GetProperty() {
    console.log('get propertyyy');
    try {
        const response = await ownerRequest.get('/owner/getproperty');
        console.log(response," response in oowner fetch property apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function FetchProperty(id) {
    console.log(id,'get propertyyy');
    try {
        const response = await ownerRequest.get(`/owner/getproperty/${id}`);
        console.log(response," response in oowner fetch property apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function PropertyEdit(details, id) {
    console.log(id,'edit propertyyy');
    try {
        const response = await ownerRequest.put(`/owner/editproperty/${id}`,details)
        console.log(response," response in oowner EDit property apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function HideProperty(id) {
    console.log(id,'hide propertyyy');
    try {
        const response = await ownerRequest.patch(`/owner/hideproperty/${id}`)
        console.log(response," response in oowner hide property apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function FetchBookings() {
    console.log('FetchBookings');
    try {
        const response = await ownerRequest.get('/owner/FetchBookings');
        console.log(response," response in /owner/FetchBookings apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function FetchCategory() {
    console.log('FetchCategory');
    try {
        const response = await ownerRequest.get('/owner/fetchcategory');
        return response
    } catch (error) {
        console.log(error);
    }
}  

export async function PaginateProperty(currentPage, id) {
    console.log(id, "PaginateProperty ");
    try {
        const res = await ownerRequest.get(`/properties/${currentPage}`);
        console.log(res, "res in PaginateProperty apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
export async function getOwner(id) {
    console.log( id,"getOwner ");
    try {
        const res = await ownerRequest.get(`/owner/profile/${id}`);
        console.log(res, "res in getOwner apii");
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function addOwnerImage(imageUrl, ownerId) {
    console.log(imageUrl, ownerId, "addProfileImage ");
    try {
        const res = await ownerRequest.patch(`/profileimage/${ownerId}`, imageUrl);
        console.log(res, "res in addOwnerProfileImage apii");
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function resetOwnerPassword(id, details) {
    try {
        const res = await ownerRequest.patch(`/resetownersecurity/${id}`, details);
        return res
    } catch (error) {
        console.log(error);
    }
}

export async function NewOwnerProfileData(formData, id) {
    console.log(formData, "NewOwnerProfileData ");
    try {
        const res = await ownerRequest.put(`/editprofile/${id}`, formData);
        console.log(res, "res in NewProfileData apii");
        return res
    } catch (error) {
        console.log(error);
    }
}
