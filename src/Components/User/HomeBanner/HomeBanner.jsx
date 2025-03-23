import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import HomeCards from '../HomeCards/HomeCards';
import Banner from '../../../assets/images/BannerDemo.jpg'

function HomeBanner() {
  return (
    <>
      <div className="relative w-full h-screen">
        <h3 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 font-extrabold text-white text-3xl sm:text-6xl lg:text-8xl w-[90%] max-w-7xl font-mono text-center animate-pulse leading-tight">
          INTR<span className="text-black">ODUCING</span> A N<span className="text-black">EW</span> HOMELAND
        </h3>
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src={Banner}
            alt="Banner"
          />
        </div>
        <ToastContainer />
      </div>
      <HomeCards />
    </>
  )
}

export default HomeBanner
