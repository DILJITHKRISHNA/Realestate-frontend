import React, { useEffect, useState } from 'react'
import { userLogin } from '../../../Api/UserApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setUserDetails } from '../../../Redux/UserSlice/userSlice';
import ForgotPass from '../ForgotPassword/ForgotPass';


function LoginPage() {
    const [isOpn,setOpn]=useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginUser, setLoginUser] = useState({
        email: '',
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
    const handlechange=()=>{
        setOpn(true)
    }

    const handleSubmit = async (e) => {
        console.log("hiiiiiiiiiiiiiiiiiiiiiiii uuuu");
        e.preventDefault();
        try {

            if (loginUser.email.trim() === '' || loginUser.password.trim() === '') {
                toast.error("Username or Password is empty")
                
            }
            
                const response = await userLogin(loginUser);
                console.log(response, "response from login");
                const token = response.data.token;
           
            if (response.data.success === true && response.data.user.is_block !== true) {
                console.log("toastttt");
                localStorage.setItem("token", token)

                console.log(response.data.user.username, "lllllllllllll");
                dispatch(
                    setUserDetails({
                        username: response.data.user.username,
                        email: response.data.user.email,
                        mobile: response.data.user.mobile,
                    })
                );

                toast.success("Successfully logged in")
                setTimeout(() => {
                    navigate('/')
                }, 1000);

                console.log('Login successful. Token stored in local storage.');

            }else if(response.data.user.is_block === true){
                toast.error("You are blocked by Admin")
            }
            console.log(response, "responseeeeeeeeeee");
        } catch (error) {
            console.error('Login failed:', error);
        }
    }


    return (
        <>  {!isOpn?(
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
                            src="/src/assets/Logo/VarletLogo.png"
                            alt="Logo"
                            className="w-[70%] h-[75%] animate-pulse"
                        />
                    </div>
                    <div className="w-full md:w-[50%] text-white flex flex-col justify-center items-center p-4">
                        <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-[70%]">
                            <h1 className="text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse">LOGIN</h1>
                            <input
                                type="text"
                                name="email"
                                value={loginUser.email}
                                onChange={handleOnclick}
                                placeholder="Email Address"
                                autoFocus
                                className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                            />
                            <input
                                type="password"
                                name="password"
                                value={loginUser.password}
                                onChange={handleOnclick}
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
                               
                                    <strong>Forgot Password?</strong>
                            
                            </div>
                            <div className='mt-2'>
                                <Link className="text-center" to='/signup'>
                                    <strong>Sign up</strong> for a new account
                                </Link>
                            </div>
                        </form>

                        <button className='w-full md:w-[70%] mt-4 md:mt-6 px-4 py-2 border bg-black rounded-md focus:outline-none focus:border-white text-white hover:bg-white hover:text-black'>Google</button>
                    </div>
                </div>
                <ToastContainer />
                </div>
            ) : (
                <ForgotPass />
            )}
        </>
    );
}

export default LoginPage
