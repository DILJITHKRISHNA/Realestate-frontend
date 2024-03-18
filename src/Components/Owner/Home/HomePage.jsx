import React from 'react'
import { ToastContainer } from 'react-toastify'

function HomePage() {
  return (
    <>
      <div className='flex justify-center '>
        <h3 className='absolute font-extrabold flex text-white text-xxl text-2xl sm:text-5xl w-[80%] h-[20rem] font-mono justify-center items-center text-center animate-pulse gap-2'>
          <span className='text-white'>CONNECT WITH PEOPLE WHO BARELY INTERESTED IN YOUR PROPERTY.</span>
        </h3>
        <img className='2xl:mt-[20%] object-cover w-full lg:h-screen ' src="/src/assets/images/BackgroundImg.jpg" alt="" />
        <div className='absolute  mt-[15rem] flex flex-col'   >
          <div className='mt-10 flex sm:flex-row flex-col gap-20'>
            <div className='w-[19rem] h-[20rem] border-2 border-black bg-black shadow-md shadow-amber-900'>
              <table className='w-full'>
                <thead className='bg-amber-950'>
                  <tr className='text-white'>
                    <th className="p-2 pr-4">Property</th>
                    <th className="p-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-white '>
                    <td className='p-2 pl-10'>sdfsd</td>
                    <td className='p-2 pl-10'>fgd</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='w-[19rem] h-[20rem] border-2 border-black bg-black shadow-md shadow-amber-900'>
              <table className='w-full'>
                <thead className='bg-amber-950'>
                  <tr className='text-white'>
                    <th className="p-2 pr-4">Booked</th>
                    <th className="p-2">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-white'>
                    <td className='p-2 pl-10'>sdfsd</td>
                    <td className='p-2 pl-10'>fgd</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='w-[19rem] h-[20rem] border-2 border-black bg-black shadow-md shadow-amber-900'>
              <table className='w-full'>
                <thead className='bg-amber-950'>
                  <tr className='text-white'>
                    <th className="p-2 pr-4">Reserved</th>
                    <th className="p-2 pr-4">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='text-white'>
                    <td className='p-2 pl-10'>sdfsd</td>
                    <td className='p-2 pl-10'>fgd</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* <a href='/owner/property' className='bg-black text-white py-1 rounded-xl px-4 text-2xl font-semibold transform hover:scale-105 transition-transform'>Visit</a> */}
        </div>
        <ToastContainer />
      </div>

      {/* <div className='flex justify-center gap-2 bg-white h-screen text-center relative mt-16'>
          <h1 className='absolute font-extrabold text-lg flex gap-2'><span className='font-medium'>AURORA</span>OWNER HOME</h1>
          <div className='absolute border-2 border-black w-[80%] h-[80%] mt-10' style={{ zIndex: 1 }}>
            <video src="/src/assets/Animations/demo.mp4" autoPlay muted></video>
          </div>
      </div> */}
    </>

  )
}

export default HomePage
