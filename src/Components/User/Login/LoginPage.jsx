import React, { useState } from 'react'
import { userLogin } from '../../../Api/UserApi';

function LoginPage() {
    const [loginUser, setLoginUser] = useState({
        Email: '',
        password: '',
    })

    const handleOnclick = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLoginUser({
            ...loginUser,
            [name]: value
        })
    }

    console.log(loginUser, "user");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await userLogin(loginUser)
        console.log(response, "yyyyyyyyy");
    }
    return (
        <>
            <div className="relative flex h-screen bg-black justify-center items-center ">
                <div className='w-[40%] '>
                    <img
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1502814151-947a9877a776?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBsaXZpbmclMjByb29tfGVufDB8fDB8fHww"
                        alt="Background"
                    />
                </div>
                <div className="absolute w-[60%] h-[70%] flex  items-center justify-between border-8 border-black ">
                    <div className="w-[50%] h-[90%] flex items-center justify-center">
                        <img
                            src="/src/assets/Logo/VarletLogo.png"
                            alt="Logo"
                            className="w-[70%] h-[75%]"
                        />
                    </div>
                    <div className="w-[50%] text-white flex justify-center items-center ">
                        <div>
                            <form onSubmit={handleSubmit} className="w-[80%]">
                                <h1 className=" text-center pb-3 font-bold text-4xl pl-5 text-white">LOGIN</h1>
                                <input
                                    type="text"
                                    name="Email"
                                    value={loginUser.Email}
                                    onChange={handleOnclick}
                                    placeholder="Email Address"
                                    required
                                    autoFocus
                                    className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={loginUser.password}
                                    onChange={handleOnclick}
                                    placeholder="Password"
                                    required
                                    className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none"
                                >
                                    Log in
                                </button>
                                <p className="text-center mt-4">
                                    <strong>Sign up</strong> for a new account
                                </p>
                                <button className='w-full px-4 py-2 mb-4 border bg-black rounded-md focus:outline-none focus:border-white text-white hover:bg-white hover:text-black'>Google</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LoginPage
