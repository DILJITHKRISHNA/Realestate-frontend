import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import HomeCards from '../HomeCards/HomeCards';
import Banner from '../../../assets/images/BannerDemo.jpg'

function HomeBanner() {

  return (
    <>

      <div className="flex flex-col justify-center items-center relative w-full min-h-screen overflow-hidden">
        <h3 className="absolute font-extrabold text-white text-3xl sm:text-6xl lg:text-8xl w-[90%] max-w-7xl font-mono text-center animate-pulse leading-tight">
          INTR<span className="text-black">ODUCING</span> A N<span className="text-black">EW</span> HOMELAND
        </h3>
        <img
          className="sm:mt-24 lg:mt-14 w-full h-auto max-h-[90vh] object-cover"
          src={Banner}
          alt="Banner"
        />
        <ToastContainer />
      </div>
      <HomeCards />
    </>

  )
}

export default HomeBanner
