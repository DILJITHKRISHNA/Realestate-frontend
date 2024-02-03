import React from 'react'

function HomePage() {
  return (
    <>
      <div className='flex justify-center bg-red-500 h-screen text-center relative'>
        <h1 className='text-lg flex '>AURORA</h1>
        <h1 className='font-extrabold text-lg'>Owner Home</h1>
        <div className='absolute border-2 border-black w-[80%] h-[70%] mt-10' style={{ zIndex: 1 }}>
        </div>
      </div>
    </>

  )
}

export default HomePage
