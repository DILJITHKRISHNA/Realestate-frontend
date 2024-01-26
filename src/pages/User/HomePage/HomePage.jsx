import React from 'react'
import HeaderNav from "../../../Components/User/Header/HeaderNav"
import HomeBanner from '../../../Components/User/HomeBanner/HomeBanner'

function HomePage() {
  console.log("home");
  return (
    <div>
      <HeaderNav />
      <HomeBanner/>
    </div>
  )
}

export default HomePage
