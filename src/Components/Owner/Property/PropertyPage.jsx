import React, { useState } from 'react'
import { HomeIcon, SearchIcon } from '@heroicons/react/solid';
import { useLocation } from 'react-router-dom';
import { AddProperty } from '../../../Api/OwnerApi';

function PropertyPage() {

  const [open, SetOpen] = useState(false)  

  const handleOpen = () => {
    SetOpen(true)
  }

  

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await AddProperty(propertyData)
      console.log(res, "resssssponn in property page");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className='bg-white flex flex-col items-center justify-center h-full w-full'>

        <div className='flex mt-8  w-[80%] justify-around'>
          <h1 className='uppercase font-semibold text-lg mr-4 inline-flex items-center mb-6'>
            <HomeIcon className='w-6 h-6 text-black mr-2' />
            Property List
          </h1>
          <div className='mb-4'>
            <SearchIcon className='absolute w-4 h-8 ml-2 text-black' />
            <input type='text' placeholder='Search Properties' className='border-2 text-center border-black p-2 rounded-lg h-[80%] ' />
          </div>
          <form action="">
            <button onClick={handleOpen} className='flex items-center uppercase bg-black text-white hover:text-black rounded-lg py-2 px-6 h-8 hover:bg-white border-2'>
              <HomeIcon className='w-6 h-6 text-white hover:text-black' />
              Add New Property
            </button>
          </form>
        </div>

        <div className='flex mb-4 w-[80%]'>
          <div className='flex flex-col pb-20 mb-24 bg-white border-8 border-black rounded-lg shadow-lg overflow-x-auto w-full '>
            <div className='flex flex-col gap-4 p-4'>
              {/* Property items will go here */}
            </div>
          </div>
        </div>

      </div>
      {/* property modal */}
      {/* {open?} */}
      {/* property modal */}

    </>
  )
}

export default PropertyPage
