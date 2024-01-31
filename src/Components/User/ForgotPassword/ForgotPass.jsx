import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { ManageUserOtp, userPass } from '../../../Api/UserApi'
import { useNavigate } from 'react-router-dom'
import { setUserDetails } from '../../../Redux/UserSlice/userSlice'

function ForgotPass() {

  const navigate = useNavigate()
  const [forgot, setForgot] = useState({
    email: ''
  })

  const handleOnclick = (e) => {
    const { name, value } = e.target
    setForgot({
      ...forgot,
      [name]: value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await userPass(forgot)
      const mail = {email: forgot.email}
      await ManageUserOtp(mail).then((res)=>console.log(res));
      if(res.data.success){

        toast.success("Please Verify Your OTP")

        setTimeout(() => {
          navigate('/otp',{state: 'forgot'})
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
              src="/src/assets/Logo/VarletLogo.png"
              alt="Logo"
              className="w-[70%] h-[75%] animate-pulse"
            />
          </div>
          <div className="w-full md:w-[50%] text-white flex flex-col justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-[70%]">
              <h2 className="pb-3 font-bold text-3xl  text-white animate-pulse w-96">Forgot Your Password?</h2>
              <p className=" pb-3 font-light text-sm  text-white">That's okay, it happens! click on the button below to reset your password.</p>
              <input
                type="text"
                name="email"
                value={forgot.email}
                onChange={handleOnclick}
                placeholder="Email Address"
                autoFocus
                className=" mt-2 w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none mb-4"
              >
                Send OTP
              </button>
            </form>

          </div>
        </div>
        <ToastContainer />
      </div>
  
    </>
  )
}

export default ForgotPass
