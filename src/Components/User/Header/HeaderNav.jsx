import React, { useEffect, useState } from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { setUserDetails } from '../../../Redux/UserSlice/userSlice'
import { FetchProfileData } from '../../../Api/UserApi';

function HeaderNav() {


  const userSelector = useSelector((state) => state.user)
    const id = userSelector.userInfo.id
  console.log(userSelector, "use selectorrrrrrfgdfgrrrrrr");
  const UserGoogleData = userSelector.userInfo
  const OwnerGoogleData = userSelector.OwnerInfo
  console.log(OwnerGoogleData, "seleeeeee");
  const [storedToken, setStoredToken] = useState('')
  const [profileImg, setProfileImg] = useState('')

  useEffect(() => {
    let localStore = localStorage.getItem("token")
    setStoredToken(localStore)
    console.log(localStore, " localstore");
  }, [setStoredToken])

  useEffect(()=>{
    const profile = async() => {
      const profileImage =  await FetchProfileData(id)
      if(profileImage.data.success){
        setProfileImg(profileImage.data.userData)
      }
    }
    profile()
  },[id])

  return (
    <>
      <div className="app">
        <nav className="z-20 fixed top-0 bg-black h-auto w-full flex justify-between items-center shadow-md p-2 sm:flex-shrink-">
          <Link to='/'>
            <div className="flex items-center">
              <img src={VarletLogo} alt="Logo" className="h-12 w-12 animate-pulse" />
              <span className="ml-2 text-white font-bold animate-pulse">AURORA</span>
            </div>
          </Link>
          <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
            <Link to="/" className='hover:underline text-white hover:text-yellow-100'>Home</Link>
            <Link to="/property" className='hover:underline text-white hover:text-yellow-100'>Properties</Link>
            {storedToken && userSelector ? (
              <Link to="/profile" className='hover:underline text-white hover:text-yellow-100 flex flex-row gap-2'>
                <img src={profileImg.imageUrls}
                  alt=""
                  className='rounded-full w-6 h-6 mt-1'
                />
                <h1>{UserGoogleData.username}</h1>
              </Link>
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