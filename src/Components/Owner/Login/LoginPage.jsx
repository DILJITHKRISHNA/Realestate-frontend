import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { OwnerLogin } from '../../../Api/OwnerApi.js'
import { ToastContainer, toast } from 'react-toastify'
import { setOwnerDetails } from '../../../Redux/OwnerSlice/ownerSlice.jsx'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'

function LoginPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ownerData, setOwnerData] = useState({
    email: "",
    password: "",
  })

  const handleOnclick = (e) => {
    const { name, value } = e.target
    setOwnerData({
      ...ownerData,
      [name]: value

    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!ownerData.email || !ownerData.password) {
      toast.error("Please provide both email and password");
      return;
    }
  
    if (ownerData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
  
    try {
      console.log(ownerData, "ownerdataaaaaassss");
      const response = await OwnerLogin(ownerData);
      const token = response.data.token;
  
      if (!response.data.success) {
        toast.error("Owner not found. Please sign up.");
        return;
      }
  
      console.log(response,"{}}}}}}}}}}}}}}}}}}}}}}}}");
      if (response.data.user.is_block !== true) {
        localStorage.setItem("ownertok", token);
        dispatch(
          setOwnerDetails({
            id: response.data.user._id,
            username: response.data.user.username,
            email: response.data.user.email,
            mobile: response.data.user.mobile,
            is_kyc: response.data.user.is_Kyc
          })
        );
        toast.success("Successfully logged in");
        setTimeout(() => {
          navigate("/owner/");
        }, 1000);
      } else {
        toast.error("You are blocked by admin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <div>
        <div className="relative flex h-screen bg-black justify-center items-center">
          <div className='w-full md:w-[40%] lg:w-[30%] '>
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              src="https://img.freepik.com/premium-photo/living-room-concept-black-color-with-furniture-highlighted-black-white_7023-2568.jpg"
              alt="Background"
            />
          </div>
          <div className="absolute w-full md:w-[60%] lg:w-[60%] h-[80%] flex flex-col md:flex-row items-center justify-between border-8 border-black ">
            <div className="w-full md:w-[50%] h-[90%] flex items-center justify-center">
              <img
                src={VarletLogo}
                alt="Logo"
                className="w-[70%] h-[75%] animate-pulse"
              />
            </div>
            <div className="w-full md:w-[50%] text-white flex flex-col justify-center items-center p-4">
              <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-[70%]">
                <h1 className="text-center pb-3 font-bold text-3xl pl-5 text-white animate-pulse">LOGIN</h1>
                <input
                  type="text"
                  name="email"
                  value={ownerData.email}
                  onChange={handleOnclick}
                  placeholder="Email Address"
                  required
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="password"
                  name="password"
                  value={ownerData.password}
                  onChange={handleOnclick}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none mb-4"
                >
                  Log in
                </button>
                <Link className="text-center" to='/owner/signup'>
                  <strong>Sign up </strong> for a new account
                </Link>
              </form>
              {/* <button className='w-full md:w-[70%] mt-4 md:mt-6 px-4 py-2 border bg-black rounded-md focus:outline-none focus:border-white text-white hover:bg-white hover:text-black'>Google</button> */}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default LoginPage
