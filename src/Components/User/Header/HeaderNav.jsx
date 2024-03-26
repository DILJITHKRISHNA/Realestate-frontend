import React, { useEffect, useState } from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { setUserDetails } from '../../../Redux/UserSlice/userSlice'
import { FetchProfileData } from '../../../Api/UserApi';
import { FaCommentDots } from 'react-icons/fa';

function HeaderNav() {


  const userSelector = useSelector((state) => state.user)
  const id = userSelector.userInfo.id
  const UserGoogleData = userSelector.userInfo
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [storedToken, setStoredToken] = useState('')
  const [profileImg, setProfileImg] = useState('')

  useEffect(() => {
    let localStore = localStorage.getItem("token")
    setStoredToken(localStore)
    console.log(localStore, " localstore");
  }, [setStoredToken])

  useEffect(() => {
    const profile = async () => {
      const profileImage = await FetchProfileData(id)
      if (profileImage.data.success) {
        setProfileImg(profileImage.data.userData)
      }
    }
    profile()
  }, [id])


  return (
    <>
      <div className={`fixed z-10 top-0 left-0 h-full bg-black text-white w-48 ${isSidebarOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="p-4">
          <ul className='mt-16 flex flex-col gap-4'>
            <li>
              <a href="/" className="lg:flex group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
            <li>
              <a href="/property" className="lg:flex group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                Property
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
            <li>
              <a href="/chat" className="lg:flex group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                Chat
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
            {storedToken && userSelector ? (
              <li className="flex gap-6 items-center">
                <a href="/profile" className="lg:flex flex-row gap-2 group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  <span className='flex flex-row gap-2 items-center'>

                    {UserGoogleData.username}
                  </span>
                </a>
              </li>

            ) : (
              <>
                <li><Link to="/login" className="block py-2 hover:underline">Login</Link></li>
                <li><Link to="/signup" className="block py-2"><button className="bg-white w-full h-8 border-collapse text-black rounded-lg">SignUp</button></Link></li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="app">
        <nav className="z-20 fixed top-0 bg-black h-auto w-full flex justify-between items-center shadow-md p-2 sm:flex-shrink">
          <Link to='/'>
            <div className="flex items-center">
              <img src={VarletLogo} alt="Logo" className="h-12 w-12 animate-pulse" />
              <span className="ml-2 flex flex-col text-white font-mono animate-pulse">AURORA</span>
            </div>
          </Link>
          <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
            <a href="/" className="hidden lg:flex group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a href="/property" className="hidden lg:flex group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
              Property
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a href="/chat" className="hidden lg:flex group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
              <FaCommentDots />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            {storedToken && userSelector ? (
              <a href="/profile" className="hidden lg:flex gap-2 group relative ml-0 mr-0 font-bold md:ml-0 md:mr-2 sm:mr-4 transition-color hover:text-yellow-300 transition-transform duration-300 hover:translate-x-1">
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform origin-bottom scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                <img src={profileImg.imageUrls}
                  alt=""
                  className='rounded-full w-6 h-6 mt-1'
                />
                <span>{UserGoogleData.username}</span>
              </a>
            ) : (
              <>
                <Link to="/login" className='hidden lg:block hover:underline text-white hover:text-yellow-100'>Login</Link>
                <Link to="/signup" className="hidden lg:block">
                  <button className='bg-white w-[100%] h-8 border-collapse text-black rounded-lg'>SignUp</button>
                </Link>
              </>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-white">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default HeaderNav