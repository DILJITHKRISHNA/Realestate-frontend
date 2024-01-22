import React from 'react'
import VarletLogo from '../../../assets/Logo/VarletLogo.png'
import backgroundImg from '../../../assets/images/BackgroundImg.jpg'
import { Link } from 'react-router-dom'

function HeaderNav() {
  return (
    <>
      <div className="app">
        <nav className="navbar bg-black h-12 flex justify-between items-center">
          <div className="left-section flex items-center">
            <img src={VarletLogo} alt="Logo" className="h-12 w-12" />
            <span className="ml-2 text-white font-semibold">VARLET</span>
          </div>
          <div className="right-section text-white flex items-center gap-x-1 text-md font-semibold leading-6 gap-4 mr-4">
            <Link path="/h">Home</Link>
            <Link path="/properties">Properties</Link>
            <Link path="/blog">Blog</Link>
            <Link path="/login">Login</Link>
            <button className='bg-white border-collapse text-black rounded '>SignUp</button>
          </div>
        </nav>
        <div className="mt-2 justify-center align-middle h-2">
          <img src={backgroundImg} alt="backgroundImg" className="h-auto w-full" />
          <p></p>
          <h3 className='text-4xl font-bold mb-4 absolute inset-0 flex flex-col items-center justify-center text-white text-center align-top'>INTRODUCING A NEW HOMELAND</h3>
        </div>
      </div>
    </>
  )
}

export default HeaderNav