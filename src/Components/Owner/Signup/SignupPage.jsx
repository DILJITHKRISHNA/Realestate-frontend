import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { manageOwnerOtp, signUpOwner } from '../../../Api/OwnerApi.js'

function SignupPage() {

  const navigate = useNavigate()

  const [ownerSignup, setOwnerSignup] = useState({
    username: "",
    email: "",
    mobile: "",
    password: ""
  })

  const handleClick = (e) => {
    try {
      const { name, value } = e.target
      setOwnerSignup({
        ...ownerSignup,
        [name]: value
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await signUpOwner(ownerSignup)
      console.log(response, "response ffrom handlesubmit in ownersignup");
      if(response.data.success){
        const ownerMail = {email: ownerSignup.email} 
        console.log(ownerMail,"owner mail from handle submit");
        await manageOwnerOtp(ownerMail)
        .then((res)=>console.log(res,"ressss inside then in handlesubmit"))
        navigate('/owner/otp')
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <>
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
                src="/src/assets/Logo/VarletLogo.png"
                alt="Logo"
                className="w-[70%] h-[75%] animate-pulse"
              />
            </div>
            <div className="w-full md:w-[50%] text-white flex flex-col justify-center items-center p-4">
              <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-[70%]">
                <h1 className="text-center pb-3 font-bold text-3xl pl-5 text-white animate-pulse">OWNER SIGN UP</h1>
                <input
                  type="text"
                  name="username"
                  value={ownerSignup.username}
                  onChange={handleClick}
                  placeholder="Fullname"
                  required
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="text"
                  name="email"
                  value={ownerSignup.email}
                  onChange={handleClick}
                  placeholder="Email Address"
                  required
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="text"
                  name="mobile"
                  value={ownerSignup.mobile}
                  onChange={handleClick}
                  placeholder="Mobile number"
                  required
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="password"
                  name="password"
                  value={ownerSignup.password}
                  onChange={handleClick}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white focus:outline-none mb-4"
                >
                 Sign Up
                </button>
                <Link className="text-center" to='/owner/login'>
                  Already Have Account? <strong>LOG IN</strong> 
                </Link>
              </form>
              <button className='w-full md:w-[70%] mt-4 md:mt-6 px-4 py-2 border bg-black rounded-md focus:outline-none focus:border-white text-white hover:bg-white hover:text-black'>Google</button>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default SignupPage
