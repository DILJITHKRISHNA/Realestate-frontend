import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import HomeCards from '../HomeCards/HomeCards';

function HomeBanner() {
  return (
    <>
    <div className='flex justify-center items-center '>
      <h3 className='absolute font-extrabold text-white text-8xl w-[80%] font-mono text-center animate-pulse'>INTR<span className='text-black'>ODUCING</span> A N<span className='text-black'>EW</span> HOMELAND</h3>
      <img className='h-screen w-screen' src="/src/assets/images/BannerDemo.jpg" alt="" />
      <ToastContainer />
    </div>
    <HomeCards/>
    </>
  )
}

export default HomeBanner
