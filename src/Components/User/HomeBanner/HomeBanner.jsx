import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import HomeCards from '../HomeCards/HomeCards';
import Banner from '../../../assets/images/BannerDemo.jpg'

function HomeBanner() {

  return (
    <>

      <div className='flex justify-center items-center'>
        <h3 className='absolute font-extrabold text-white text-4xl sm:text-8xl w-[80%] font-mono text-center animate-pulse'>INTR<span className='text-black'>ODUCING</span > A N < span className='text-black' > EW</span> HOMELAND</h3>
        <img className='2xl:mt-[20%]  object-contain max-w-full max-h-full' src={Banner} alt="" />
        <ToastContainer />
      </div >
      <HomeCards />
    </>

  )
}

export default HomeBanner
