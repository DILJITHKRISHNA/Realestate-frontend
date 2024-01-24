import React, { useState } from 'react'
import { userSignUp } from '../../../Api/UserApi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpPage from '../OtpPage/OtpPage'

function SignUpPage() {
    const navigate = useNavigate()

    const [SignupUser, setSignupUser] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
    })

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

            const response = await userSignUp(SignupUser);
            console.log(response,"response from ");
            if (response.data.success) {
                navigate('/OtpPage');
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
        }
    };
    return (
        <>

            <div className="relative flex h-screen bg-black justify-center items-center ">
                <img
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    src="https://images.unsplash.com/photo-1502814151-947a9877a776?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBsaXZpbmclMjByb29tfGVufDB8fDB8fHww"
                    alt="Background"
                />
                <div className="absolute w-[60%] h-[70%] flex  items-center justify-between border-8 border-black ">
                    <div className="w-[50%] h-[90%] flex items-center justify-center">
                        <img
                            src="/src/assets/Logo/VarletLogo.png"
                            alt=""
                            className="w-[70%] h-[75%] animate-pulse "
                        />
                    </div>
                    <div className="w-[50%] text-white flex justify-center items-center ">
                        <div>
                            <form onSubmit={handleSubmit} className="w-[80%]">
                                <h1 className=" text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse">SIGN UP</h1>
                                <input
                                    type="text"
                                    name="username"
                                    value={SignupUser.username}
                                    onChange={handleClick}
                                    placeholder="Fullname"
                                    required
                                    autoFocus
                                    className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                />
                                <input
                                    type="text"
                                    name="email"
                                    value={SignupUser.email}
                                    onChange={handleClick}
                                    placeholder="Email Address"
                                    required
                                    autoFocus
                                    className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                />
                                <input
                                    type="text"
                                    name="mobile"
                                    value={SignupUser.mobile}
                                    onChange={handleClick}
                                    placeholder="Mobile Number"
                                    required
                                    autoFocus
                                    className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={SignupUser.password}
                                    onChange={handleClick}
                                    placeholder="Password"
                                    required
                                    className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none"
                                >
                                    Sign Up
                                </button>
                                <Link className="text-center mt-4" to='/login'>
                                    Already have account? <strong>Login</strong>
                                </Link>
                            </form>
                            <button className='w-[80%] mt-6 px-4 py-2 mb-4 border bg-black rounded-md focus:outline-none focus:border-white text-white hover:bg-white hover:text-black'>Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpPage
