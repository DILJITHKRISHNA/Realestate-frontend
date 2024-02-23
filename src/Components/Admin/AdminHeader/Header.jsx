import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo/VarletLogo.png';
import DarkLight from '../Dark&Light/DarkLight';
import Sidebar from '../AdminSidebar/Sidebar';
import { BellIcon, UserCircleIcon, LogoutIcon } from '@heroicons/react/solid';
function Header() {

  const navigate = useNavigate()

  const handleClick = () =>{
    try {
      localStorage.removeItem("admintok")
      navigate('/admin/login')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-gray-950 h-16 flex items-center justify-between px-4">
        <div className='w-[7%]  flex justify-start items-start p-3'>
          <h1 className='text-white flex justify-center'>AURORA</h1>
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="flex items-center">
          <Link to=''>
            <div className="mr-4">
              <BellIcon className="h-6 w-6 text-white hover:text-yellow-100 hover:underline" />
            </div>
          </Link>

          <Link to='/admin/profile'>
            <div className="mr-4">
              <UserCircleIcon className="h-6 w-6 text-white hover:text-yellow-100" />
            </div>
          </Link>

          <button onClick={handleClick}>
            <div className="mr-4">
              <LogoutIcon className="h-6 w-6 text-white hover:text-yellow-100" />
            </div>
          </button>
          
    
        </div>
      </div>
    </>
  );
}

export default Header;
