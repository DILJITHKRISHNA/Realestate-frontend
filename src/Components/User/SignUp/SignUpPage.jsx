import React, { useEffect, useState } from 'react'
import { ManageUserOtp, userRegisterGoogle, userSignUp } from '../../../Api/UserApi'
import HeaderNav from '../../../Components/User/Header/HeaderNav'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useGoogleLogin } from "@react-oauth/google";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '../../../Redux/UserSlice/userSlice'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'


function SignUpPage() {
    const navigate = useNavigate()
    const [user, SetUser] = useState([])
    const dispatch = useDispatch();
    const GoogleRegister = useGoogleLogin({
        onSuccess: (codeResponse) => SetUser(codeResponse),
        onError: () => toast.error("Google Authentication Failed")

    })
    console.log(user, 'kjhghjgh');

    useEffect(() => {
        const FetchData = async () => {
            try {
                if (user) {
                    const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    const result = await userRegisterGoogle(response.data)
                    localStorage.setItem("token", result.data.UserToken);
                    dispatch(setUserDetails({
                        email: result.data.GoogleData.email,
                        username: result.data.GoogleData.username,
                        id: result.data.GoogleData._id,
                        is_google: true
                    }))
                    toast.success("Successfully logged in");
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchData()
    }, [user]);

    const [SignupUser, setSignupUser] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
    })

    if (SignupUser.username === Number) {
        toast.error("username should be characters")
    }

    const handleClick = (e) => {
        const { name, value } = e.target
        setSignupUser({
            ...SignupUser,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            if (SignupUser.email.trim() === '' && SignupUser.mobile.trim() === '' && SignupUser.password.trim() === '' && SignupUser.username.trim() === '') {
                toast.error("All Fields Are Required")
            } else if (SignupUser.password.length < 8) {
                toast.error("password should have atleast 8 characters");
            } else {

                const response = await userSignUp(SignupUser);
                console.log(response, "response from ");

                if (response.data.success) {
                    const userMail = { email: SignupUser.email }
                    console.log(userMail, "usermaillllllllllllllllllllll");
                    await ManageUserOtp(userMail).then((res) => console.log(res))
                    navigate('/otp', { state: 'user' });
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="relative flex h-screen bg-black justify-center items-center">
                <div className='w-full md:w-[40%] lg:w-[30%] '>
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1502814151-947a9877a776?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBsaXZpbmclMjByb29tfGVufDB8fDB8fHww"
                        alt="Background"
                    />
                </div>
                <div className="absolute w-full md:w-[60%] lg:w-[60%] h-[80%] flex flex-col md:flex-row items-center justify-between border-8 border-black ">
                    <div className="w-full md:w-[50%] h-[90%] flex items-center justify-center">
                        <img
                            src={VarletLogo}
                            alt="Logo"
                            className="w-[40%] lg:w-[70%] h-[75%] animate-pulse"
                        />
                    </div>
                    <div className="w-full md:w-[50%] text-white flex flex-col justify-center items-center p-4">
                        <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-[70%]">
                            <h1 className="text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse">SIGN UP</h1>
                            <input
                                type="text"
                                name="username"
                                value={SignupUser.username}
                                onChange={handleClick}
                                placeholder="Full Name"
                                autoFocus
                                className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                            />
                            <input
                                type="text"
                                name="email"
                                value={SignupUser.email}
                                onChange={handleClick}
                                placeholder="Email Address"
                                autoFocus
                                className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                            />
                            <input
                                type="text"
                                name="mobile"
                                value={SignupUser.mobile}
                                onChange={handleClick}
                                placeholder="Mobile number"
                                autoFocus
                                className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                            />
                            <input
                                type="password"
                                name="password"
                                value={SignupUser.password}
                                onChange={handleClick}
                                placeholder="Password"
                                className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none mb-4"
                            >
                                Sign Up
                            </button>
                            <Link className="text-center" to='/login'>
                                Already Have Account? <strong>LOG IN</strong>
                            </Link>
                        </form>
                        <div
                            onClick={() => GoogleRegister()}
                            className="mt-4 flex justify-center border items-center gap-5 rounded-md p-1 w-[70%] shadow-md transition duration-500 hover:scale-105 cursor-pointer"
                        >
                            <FcGoogle />
                            <div className=''>
                                sign in with Google
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default SignUpPage
