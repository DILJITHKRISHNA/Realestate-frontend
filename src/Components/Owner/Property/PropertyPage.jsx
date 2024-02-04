import React from 'react'
import { HomeIcon } from '@heroicons/react/solid';

function PropertyPage() {
  return (
    <>
      <div className='bg-white flex flex-col h-full'>

        {/* Property Listing Section */}
        <div className='flex items-center mb-8 mt-10'>
          <h1 className='uppercase font-semibold text-lg mr-4'>Property List</h1>
          {/* User Hero Icon */}
          <HomeIcon className='w-6 h-6 text-black' />
        </div>

        {/* Search Bar and Add Property Section */}
        <div className='flex mb-4'>

          {/* Property List Section */}
          <div className='flex flex-col w-[60%] pb-20 mb-24 bg-white rounded-lg shadow-lg overflow-x-auto'>
            {/* Search Bar Section */}
            <div className='mb-4'>
              {/* Assuming you have a search bar component */}
              <input type='text' placeholder='Search Properties' className='border-2 border-black p-2 rounded-lg w-full' />
            </div>

            {/* Property Entries */}
            <div className='flex flex-col gap-4 p-4'>
              {/* Property Entry 1 */}
              <div className='flex items-center'>
                {/* User Hero Icon */}
                <HomeIcon className='w-8 h-8 text-black' />
                {/* Small heading for property */}
                <h2 className='text-sm font-semibold ml-2'>Property 1</h2>
              </div>

              {/* Property Entry 2 */}
              <div className='flex items-center'>
                {/* User Hero Icon */}
                <HomeIcon className='w-8 h-8 text-black' />
                {/* Small heading for property */}
                <h2 className='text-sm font-semibold ml-2'>Property 2</h2>
              </div>

              {/* Add more property entries as needed */}
            </div>
          </div>

          {/* Add Property Section */}
          <div className='ml-4 w-[40%]'>
            <button className='flex items-center bg-black text-white hover:text-black rounded-2xl py-2 px-6 hover:bg-white'>
              {/* Placeholder icon for add property */}
              <HomeIcon className='w-6 h-6 text-white' />
              Add Property
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default PropertyPage
