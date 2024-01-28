import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {

  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem("token")
    navigate('/admin/login')
  }

  return (
    <div className='flex justify-center items-center'>

      <div className='  bg-black '>
        <button className='bg-black text-white flex justify-center' onClick={handleClick}>LOG OUT</button>
      </div>
    </div>
  )
}

export default ProfilePage
