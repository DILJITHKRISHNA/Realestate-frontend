import React from 'react'

function HomeBanner() {
  return (
    <div className='flex justify-center items-center'>
      <h3 className='absolute  font-extrabold text-gray-200 text-8xl w-[80%] font-mono text-center animate-pulse'>INTRODUCING A NEW HOMELAND</h3>
      <img className='h-screen w-screen' src="/src/assets/images/BackgroundImg.jpg" alt="" />
    </div>
  )
}

export default HomeBanner
