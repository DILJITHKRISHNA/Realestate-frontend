import React, { useState } from 'react'
import OtpPage from "../../../Components/User/OtpPage/OtpPage.jsx"
import Reset from '../../../Components/User/ResetPassword/Reset.jsx'
import { useLocation } from 'react-router-dom'
function Otp() {

  const location = useLocation()
  const Current = location.state

  return (
    <div>
      {Current === "user" ?
        <OtpPage />
        : ""}
      {Current === "forgot" ?
        <OtpPage /> : ""
      }
      {Current === "otp" ?
        <Reset /> : ""
      }
    </div>
  )
}

export default Otp
