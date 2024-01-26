import React from 'react'
import { OwnerverifyOtp } from '../../../Api/OwnerApi'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function OTP() {
    const navigate = useNavigate()

    const handleOtp = async (e) => {
        e.preventDefault()
        let otp = ''
        otp += e.target.num1.value
        otp += e.target.num2.value
        otp += e.target.num3.value
        otp += e.target.num4.value

        const otpData = { otp }

        if (otp.length === 4) {
            try {
                const res = await OwnerverifyOtp(otpData);
                console.log(res.data.success, "res in otp areaaaaa");
                if (res.data.success === true) {
                    toast.success("owner registered successfully");
                    navigate('/owner/login');
                } else {
                    toast.error("Wrong Otp");
                }
            } catch (error) {
                console.error("Error during API call:", error);
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    return (
        <>
            <div>
                <div className="relative flex h-screen bg-black justify-center items-center">
                    <div className='w-[40%] '>
                        <img
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                            src="https://img.freepik.com/premium-photo/living-room-concept-black-color-with-furniture-highlighted-black-white_7023-2568.jpg"
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
                                                name="num1"
                                                maxLength="1"
                                                className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                            />
                                            <input
                                                type="text"
                                                name="num2"
                                                maxLength="1"
                                                className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                            />
                                            <input
                                                type="text"
                                                name="num3"
                                                maxLength="1"
                                                className="w-10 h-10 px-2 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white text-center"
                                            />
                                            <input
                                                type="text"
                                                name="num4"
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
            </div>
            <ToastContainer />
        </>
    )
}

export default OTP
