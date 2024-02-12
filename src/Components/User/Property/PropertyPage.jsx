import React from 'react'
import PropertyList from './PropertyList'

function PropertyPage() {
  return (
    <>
      <div className='flex flex-wrap mt-16 h-[20%]'>
        <div className='z-10 absolute w-[66%] h-[100%] mt-8 ml-10 rounded-2xl p-2'>
          <h1 className='text-white font-league-spartan text-lg font-bold'>Left Box</h1>
          {/* contents here */}
          <PropertyList />
        </div>
        <div className='absolute w-screen h-screen flex justify-end'>
          <div className='w-[28%] h-[80%] mt-16 mr-10 bg-black rounded-2xl'>
            <div className='p-6 mt-2'>
              <h1 className='text-white font-league-spartan text-lg font-bold'>Find Your  <span className='bg-white text-black px-1 '>Property</span></h1>
            </div>
            <div className='ml-6 flex flex-col w-[85%]'>
              <label className='text-white font-jura'>Property Type</label>
              <select name="" id="" className='mt-4 h-8 rounded-lg'></select>
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Price</label>
              <select name="" id="" className='mt-4 h-8 rounded-lg'></select>
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura' >Search By Title</label>
              <input type="text" className='mt-4 h-8 rounded-lg p-2' placeholder='Search By Title' />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura' >Search By Location</label>
              <input type="text" className='mt-4 h-8 rounded-lg p-2' placeholder='Search By location' />
            </div>
            <div className='ml-6 flex flex-col mt-2'>
              <label className='text-white font-jura'>Budget</label>
              <section className='flex flex-row gap-2'>
                <input type="text" className='mt-4 h-8 w-28 rounded-lg p-2' placeholder='Minimum' />
                <span className='text-white mt-5'>to</span>
                <input type="text" className='mt-4 h-8 w-28 rounded-lg p-2' placeholder='Maximum' />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyPage
