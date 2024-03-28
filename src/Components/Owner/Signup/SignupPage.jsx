import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { manageOwnerOtp, ownerRegisterGoogle, signUpOwner } from '../../../Api/OwnerApi.js'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOwnerDetails } from '../../../Redux/OwnerSlice/ownerSlice.jsx';
import { ToastContainer, toast } from 'react-toastify';
import VarletLogo from '../../../assets/Logo/VarletLogo.png'


function SignupPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [owner, SetOwner] = useState([])


  const GoogleRegister = useGoogleLogin({
    onSuccess: (codeResponse) => SetOwner(codeResponse),
    onError: () => toast.error("Google Authentication Failed")

  })

  useEffect(() => {
    const FetchData = async () => {
      try {
        if (owner) {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${owner.access_token}`, {
            headers: {
              Authorization: `Bearer ${owner.access_token}`,
              Accept: 'application/json'
            }
          })
          console.log(response.data.name, "laaaaaaaaaaa");
          const result = await ownerRegisterGoogle(response.data)
          dispatch(
            setOwnerDetails({
              username: response.data.name,
              is_google: true
            }
            ))
          navigate('/owner/')
          console.log(result.token, "tokkkk");
        }
      } catch (error) {
        console.log(error);
      }
    }
    FetchData()
  }, [owner]);


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
    e.preventDefault();

    if (!ownerSignup.username || !ownerSignup.email || !ownerSignup.mobile || !ownerSignup.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (ownerSignup.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await signUpOwner(ownerSignup);
      console.log(response, "response from handlesubmit in ownersignup");

      if (response.data.success) {
        const ownerMail = { email: ownerSignup.email };
        console.log(ownerMail, "owner mail from handle submit");

        await manageOwnerOtp(ownerMail).then((res) =>
          console.log(res, "response inside then in handlesubmit")
        );
        navigate('/owner/otp');
      } else {
        toast.error("Signup failed. Please check your information and try again.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };



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
                src={VarletLogo}
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
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="text"
                  name="email"
                  value={ownerSignup.email}
                  onChange={handleClick}
                  placeholder="Email Address"
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="text"
                  name="mobile"
                  value={ownerSignup.mobile}
                  onChange={handleClick}
                  placeholder="Mobile number"
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="password"
                  name="password"
                  value={ownerSignup.password}
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
                <Link className="text-center" to='/owner/login'>
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
      </>
      <ToastContainer/>
    </div>
  )
}

export default SignupPage
