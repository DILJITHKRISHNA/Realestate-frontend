import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from '../AdminHeader/Header'
import Sidebar from '../AdminSidebar/Sidebar'

function ProfilePage() {

  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem("admintok")
    navigate('/admin/login')
  }

  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
          <h1 className='flex justify-center font-bold text-2xl mb-4 bg-slate-950 rounded-md text-white'>Profile</h1>
          <div className="overflow-x-auto">
            <div className='flex justify-center items-center'>

              <div className='  bg-black '>
                <button className='bg-black text-white flex justify-center' onClick={handleClick}>LOG OUT</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center  bg-white px-5 py-5 sm:flex-row sm:justify-between">
            {/* <span className="text-xs text-gray-600 sm:text-sm"> Showing 1 to {userData?.length || 0} of Entries </span> */}

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProfilePage
