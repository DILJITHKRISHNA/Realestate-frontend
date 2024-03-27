import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Logo/VarletLogo.png';
import { BellIcon, UserCircleIcon, LogoutIcon } from '@heroicons/react/solid';
function Header() {

  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);


  const handleClick = () => {
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
          <h1 className='text-white flex- flex-col flex justify-center'>AURORA</h1>
          <Link to='/'>
            <img src={logo} alt="" className='' />
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
            <div className="mr-4 relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <LogoutIcon className="h-6 w-6 text-white hover:text-yellow-100" />
              <span className={`absolute top-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-${isHovered ? '100' : '0'} pointer-events-none transition-opacity duration-300`}>
                Logout
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
