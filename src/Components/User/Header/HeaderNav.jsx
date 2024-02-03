import React, { useEffect, useState } from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { setUserDetails } from '../../../Redux/UserSlice/userSlice'

function HeaderNav() {


  const userSelector = useSelector((state) => state.user)
  console.log(userSelector.userInfo, "use selectorrrrrrfgdfgrrrrrr");
  const UserGoogleData = userSelector.userInfo
  const [storedToken, setStoredToken] = useState('')

  useEffect(() => {
    let localStore = localStorage.getItem("token")
    setStoredToken(localStore)
    console.log(localStore, " localstore");
  }, [setStoredToken])



  return (
    <>
      <div className="app">
        <nav className="bg-black h-auto flex justify-between items-center shadow-md p-2">
          <Link to='/'>
            <div className="flex items-center">
              <img src={VarletLogo} alt="Logo" className="h-12 w-12 animate-pulse" />
              <span className="ml-2 text-white font-bold animate-pulse">AURORA</span>
            </div>
          </Link>
          <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
            <Link to="/dashboard" className='hover:underline text-white hover:text-yellow-100'>Home</Link>
            <Link to="/properties" className='hover:underline text-white hover:text-yellow-100'>Properties</Link>
            <Link to="/blog" className='hover:underline text-white hover:text-yellow-100'>Blog</Link>
            {storedToken && UserGoogleData ? (
              <Link to="/profile" className='hover:underline text-white hover:text-yellow-100'>
                {UserGoogleData.is_google ? (
                  <h1>{UserGoogleData.username}</h1>
                ) : (
                  <h1>{userSelector.username}</h1>
                )}              </Link>
            ) : (
              <>
                <Link to="/login" className='hover:underline text-white hover:text-yellow-100'>Login</Link>
                <Link to="/signup">
                  <button className='bg-white w-[100%] h-8 border-collapse text-black rounded-lg'>SignUp</button>
                </Link>
              </>

            )}


          </div>
        </nav>
      </div>
    </>
  )
}

export default HeaderNav