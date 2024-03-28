import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import HomeCards from '../HomeCards/HomeCards';

function HomeBanner() {

  return (
    <>

      <div className='flex justify-center items-center'>
        <h3 className='absolute font-extrabold text-white text-4xl sm:text-8xl w-[80%] font-mono text-center animate-pulse'>INTR<span className='text-black'>ODUCING</span > A N < span className='text-black' > EW</span> HOMELAND</h3>
        <img className='2xl:mt-[20%]  object-contain max-w-full  max-h-full' src="https://images.unsplash.com/photo-1624921938155-48a9a341d501?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <ToastContainer />
      </div >
      <HomeCards />
    </>

  )
}

export default HomeBanner
