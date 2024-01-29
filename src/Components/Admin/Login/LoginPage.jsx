import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { AdminLogin } from '../../../Api/AdminApi'
import { useDispatch } from 'react-redux'
import { setAdminDetails } from '../../../Redux/AdminSlice/adminSlice'

function LoginPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  })
  
  const handleOnclick = (e) =>{
    const {name, value} = e.target
    setAdminData({
      ...adminData,
      [name]: value
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
      if(adminData.email.trim() === "" && adminData.password.trim()){
        return toast("Please enter both fields", {type:"error"})
      }
      const response = await AdminLogin(adminData)
      console.log(response);
      let token = response.data.token

      if(response.data.token){
        localStorage.setItem('token', JSON.stringify(token))

        dispatch(
          setAdminDetails({
            username: response.data.admin.username,
            email: response.data.admin.email,
            mobile: response.data.admin.mobile
          })
        )
        navigate('/admin/')
        toast.success("login successfull")
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
              src="https://img.freepik.com/premium-photo/living-room-concept-black-color-with-furniture-highlighted-black-white_7023-2565.jpg"
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
                <h1 className="text-center pb-3 font-bold text-4xl pl-5 text-white animate-pulse">ADMIN LOGIN</h1>
                <input
                  type="text"
                  name="email"
                  value={adminData.email}
                  onChange={handleOnclick}
                  placeholder="Email Address"
                  required
                  autoFocus
                  className="w-full px-4 py-2 mb-4 border bg-black rounded-md bg-transparent focus:outline-none focus:border-white text-white"
                />
                <input
                  type="password"
                  name="password"
                  value={adminData.password}
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
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    </div>
  )
}

export default LoginPage
