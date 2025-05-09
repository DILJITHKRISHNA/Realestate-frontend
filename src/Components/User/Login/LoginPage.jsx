import React, { useEffect, useState } from 'react'
import { userLogin, userRegisterGoogle } from '../../../Api/UserApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin } from "@react-oauth/google";
import { setUserDetails } from '../../../Redux/UserSlice/userSlice';
import ForgotPass from '../ForgotPassword/ForgotPass';
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios';
import Loading from '../../Loading/Loading';
import VarletLogo from '../../../assets/Logo/VarletLogo.png'



function LoginPage() {
    const [isOpn, setOpn] = useState(false)
    const [user, SetUser] = useState([])
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    })


    const GoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => SetUser(codeResponse),
        onError: () => toast.error("Google Authentication Failed")

    })
    console.log(user, 'inside ');

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
                    console.log(result.data,"result .dataaaaaaaaaaaaa");
                    if (result.data.success) {

                        localStorage.setItem("token", result.data.UserToken);
                        dispatch(setUserDetails({
                            email: result.data.user.email,
                            username: result.data.user.username,
                            id: result.data.user._id,
                            is_google: true
                        }))
                        toast.success("Successfully logged in");
                        setTimeout(() => {
                            navigate('/')
                        }, 1000);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        FetchData()
    }, [user]);


    const [loginUser, setLoginUser] = useState({
        email: '',
        password: '',
    })


    const handleOnchange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginUser({
            ...loginUser,
            [name]: value
        })
    }
    const handlechange = () => {
        setOpn(true)
    }

    const handleSubmit = async (e) => {
        console.log("Starting login process...");
        e.preventDefault();

        try {
            if (loginUser.email.trim() === '' || loginUser.password.trim() === '') {
                toast.error("Username or Password is empty");
                console.log("Empty username or password");
                return;
            }
            // setLoading(true);
            const response = await userLogin(loginUser)

            const token = response.data.token;
            if (response.data.success === true && response.data.user.is_block !== true) {
                console.log("Successful login!");
                localStorage.setItem("token", token);
                dispatch(
                    setUserDetails({
                        username: response.data.user.username,
                        id: response.data.user._id,
                        email: response.data.user.email,
                        mobile: response.data.user.mobile,
                    })
                );
                toast.success("Successfully logged in");

                setTimeout(() => {
                    navigate('/');
                }, 1500);

            } else if (response.data.success === false) {
                toast.error("Invalid credentials!");
            } else if (response.data.user.is_block === true) {
                toast.error("You are blocked by Admin");
            }
            setLoading(false)
        } catch (error) {
            console.error('Login failed:', error.message);
            toast.error("Error during login. Please try again.");
            setLoading(false);
        }
    };


    return (
        <>
            {loading ? (
                <span><Loading /></span>
            ) : (
                <>
                    {!isOpn ? (
                        <div className="relative flex h-screen bg-black justify-center items-center">
                            <div className='w-full md:w-[40%] lg:w-[30%]'>
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
                                        <h1 className="text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse">LOGIN</h1>
                                        <input
                                            type="text"
                                            name="email"
                                            value={loginUser.email}
                                            onChange={handleOnchange}
                                            placeholder="Email Address"
                                            autoFocus
                                            className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            value={loginUser.password}
                                            onChange={handleOnchange}
                                            placeholder="Password"
                                            className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none mb-4"
                                        >
                                            Log in
                                        </button>
                                        <div className='' onClick={handlechange}>

                                            <strong className='cursor-pointer'>Forgot Password?</strong>

                                        </div>
                                        <div className='mt-2'>
                                            <Link className="text-center" to='/signup'>
                                                <strong>Sign up</strong> for a new account
                                            </Link>
                                        </div>
                                    </form>
                                    <div
                                        onClick={() => GoogleLogin()}
                                        className="mt-4 flex justify-center border items-center gap-5 rounded-md p-1 w-[70%] shadow-md transition duration-500 hover:scale-105 cursor-pointer"
                                    >
                                        <FcGoogle />
                                        <div className=''>
                                            sign in with Google
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ToastContainer />
                        </div>
                    ) : (
                        <ForgotPass />
                    )}
                </>
            )}
        </>
    );
}

export default LoginPage
