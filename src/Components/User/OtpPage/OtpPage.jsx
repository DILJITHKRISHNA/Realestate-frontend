import React, { useEffect, useState } from 'react'
import { resendOTp, userVerifyOtp } from '../../../Api/UserApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import VarletLogo from '../../../assets/Logo/VarletLogo.png'

function OtpPage() {

    const selector = useSelector(state => state.user)
    const email = selector.userInfo.email.email
    const navigate = useNavigate()
    const location = useLocation()
    const Current = location.state
    console.log(Current);
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
                if (Current == 'user') {
                    const res = await userVerifyOtp(data);

                    if (res.data.success) {
                        toast.success("user  registered successfully");
                        setTimeout(() => {
                            navigate('/login');
                        }, 1000);
                    } else {
                        toast.error("Wrong Otp");
                    }
                } else if (Current == 'forgot') {
                    const res = await userVerifyOtp(data);
                    if (res.data.success) {
                        toast.success("Email verified");
                        setTimeout(() => {
                            navigate('/otp', { state: "otp" });
                        }, 1000);
                    } else {
                        toast.error("Wrong Otp");
                    }
                }

            } catch (error) {
                console.error("Error during API call:", error);
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    //resend Otp
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        let timer;

        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [countdown]);

    const handleResendOtp = async () => {
        try {
            const response = await resendOTp({ email: email });
            console.log(response, "Ress in resend otppp");
            setCountdown(60);
            if (response.data.success) {
                toast("Otp Re-Sended Successfully")
            }
        } catch (error) {
            console.log(error);
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
                <div className="absolute lg:w-[60%] w-[90%] h-[70%] flex flex-col lg:flex-row items-center justify-between border-8 border-black">
                    <div className="w-[50%] h-[90%] flex items-center justify-center">
                        <img
                            src={VarletLogo}
                            alt="Logo"
                            className="w-[100%] lg:w-[70%] h-[75%] animate-pulse"
                        />
                    </div>
                    <div className="w-[50%] text-white flex justify-center items-center">
                        <form onSubmit={(e) => handleOtp(e)}>
                            <div>
                                <div className="w-[80%]">
                                    <h1 className="text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse mr-2">OTP Verification</h1>
                                    <div className="flex justify-between mb-4 gap-5 lg:gap-0">
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
                                    <div className='flex justify-center items-center flex-col'>
                                        {countdown ?
                                            <h3>Resend OTP in: {countdown}</h3>
                                            :
                                            <button onClick={handleResendOtp} disabled={countdown > 0} className='bg-black text-white font-semibold px-2 rounded-md'>
                                                Resend OTP
                                            </button>
                                        }
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
