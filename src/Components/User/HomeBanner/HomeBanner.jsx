import React from 'react'

function HomeBanner() {
  return (
    <div className='flex justify-center items-center'>
      <h2 className='absolute  font-extrabold text-gray-200 text-8xl w-[80%] font-mono text-center animate-pulse'>INTRODUCING A NEW HOMELAND</h2>
      <img className='h-screen w-screen' src="/src/assets/images/BackgroundImg.jpg" alt="" />
    </div>
  )
}

export default HomeBanner
