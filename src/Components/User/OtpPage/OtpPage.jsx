import React from 'react'
import { userVerifyOtp } from '../../../Api/UserApi'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function OtpPage() {
    const navigate = useNavigate()


    const handleOtp = async (e) => {
        e.preventDefault();

        let otp = '';
        otp += e.target.first.value;
        otp += e.target.second.value;
        otp += e.target.third.value;
        otp += e.target.fourth.value;
        const data = { otp };

        if (otp.length === 4) {
            try {
                const res = await userVerifyOtp(data);

                if (res.data.success) {
                    toast.success("user  registered successfully");
                    navigate('/login');
                } else {
                    toast.error("Wrong Otp");
                }
            } catch (error) {
                console.error("Error during API call:", error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="relative flex h-screen bg-black justify-center items-center">
                <div className='w-[40%] '>
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1502814151-947a9877a776?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBsaXZpbmclMjByb29tfGVufDB8fDB8fHww"
                        alt="Background"
                    />
                </div>
                <div className="absolute w-[60%] h-[70%] flex items-center justify-between border-8 border-black">
                    <div className="w-[50%] h-[90%] flex items-center justify-center">
                        <img
                            src="/src/assets/Logo/VarletLogo.png"
                            alt="Logo"
                            className="w-[70%] h-[75%] animate-pulse"
                        />
                    </div>
                    <div className="w-[50%] text-white flex justify-center items-center">
                        <form onSubmit={(e) => handleOtp(e)}>
                            <div>
                                <div className="w-[80%]">
                                    <h1 className="text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse mr-2">OTP Verification</h1>
                                    <div className="flex justify-between mb-4">
                                        <input
                                            type="text"
                                            name="first"
                                            maxLength="1"
                                            className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                        />
                                        <input
                                            type="text"
                                            name="second"
                                            maxLength="1"
                                            className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                        />
                                        <input
                                            type="text"
                                            name="third"
                                            maxLength="1"
                                            className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                        />
                                        <input
                                            type="text"
                                            name="fourth"
                                            maxLength="1"
                                            className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                        />
                                    </div>
                                    <div className='flex justify-center items-center '>
                                        <h3>Resend otp in : </h3>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-[60%] mt-2 px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none flex justify-center items-center ml-12"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    )
}

export default OtpPage
