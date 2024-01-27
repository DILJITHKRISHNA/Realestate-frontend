import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {

    const navigate = useNavigate()

    const handleClick = () =>{
        localStorage.removeItem("token")
        navigate('/admin/login')
    }

  return (
    <div >
      <button className='bg-black text-white' onClick={handleClick}>LOG OUT</button>
    </div>
  )
}

export default ProfilePage
