import React from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import backgroundImg from '../../../assets/images/BackgroundImg.jpg'
import { Link } from 'react-router-dom'


function HeaderNav() {
  return (
    <>
      <div className="app">
        <nav className="bg-black h-auto flex justify-between items-center shadow-md p-3">
          <Link to='/'>
            <div className="flex items-center">
              <img src={VarletLogo} alt="Logo" className="h-12 w-12" />
              <span className="ml-2 text-white font-bold">MULTIVERSE</span>
            </div>
          </Link>
          <div className="text-white flex items-center text-md font-semibold leading-6 p-3 flex-wrap sm:text-xl gap-6">
            <Link to="/" className='hover:underline text-white'>Home</Link>
            <Link to="/properties" className='text-white'>Properties</Link>
            <Link to="/blog" className='text-white'>Blog</Link>
            <Link to="/login" className='text-white'>Login</Link>
            <Link to="/signup">
              <button className='bg-white bg:w-8 h-8 border-collapse text-black rounded-lg'>SignUp</button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default HeaderNav