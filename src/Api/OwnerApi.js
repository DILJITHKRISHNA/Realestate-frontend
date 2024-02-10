import axios from 'axios'


const OwnerApi = axios.create({
    baseURL: 'http://localhost:5000/owner'
})

export async function OwnerLogin(loginData) {
    try {
        console.log(loginData, "loginndataa");
        const res = await OwnerApi.post('/owner/login', loginData)
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
        const res = await OwnerApi.post('/owner/signup', signupData)
        console.log(res, "response from owner signup");
        return res
    } catch (error) {
        console.log(error.message);
    }
}

export async function manageOwnerOtp(Ownermail) {
    console.log(Ownermail, "otpdataaaaaaaaa");
    try {
        const OwnerData = await OwnerApi.post('/owner/send-otp', Ownermail)
        console.log(OwnerData, "ownerdataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        return OwnerData
    } catch (error) {
        console.log(error.message);
    }
}

export async function OwnerverifyOtp(ownerOtp) {
    try {
        console.log(ownerOtp, 'owner otp from ownerverify otp api');
        const data = await OwnerApi.post('/owner/verify-otp', ownerOtp)
        return data
    } catch (error) {
        console.log(error.message);
    }

}
export async function AddKyc(kycData) {
    try {
        const data = await OwnerApi.post('/owner/profile', kycData)
        return data
    } catch (error) {
        console.log(error);
    }
}

export async function ownerRegisterGoogle(ownerData) {
    console.log(ownerData, "dtataaa apiii");
    try {
        const response = await OwnerApi.post("/owner/ownerRegisterWithGoogle", ownerData);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function GetKyc() {
    try {
        const response = await OwnerApi.get('/kyc')
        console.log(response, "kycdataaaaaa response kittiiiiiiiiiii scnnn");
        return response
    } catch (error) {
        console.log(error);
    }
}  
export async function AddProperty(addProperty, id) {
    console.log(addProperty,id,'[[[[[[[[[[[]]]]]]]]]]]-------------------------------');
    try {
        const response = await OwnerApi.post(`/owner/property/${id}`, addProperty);
        console.log(response," response in oowner apiiiiii");
        return response
    } catch (error) {
        console.log(error);
    }
}  