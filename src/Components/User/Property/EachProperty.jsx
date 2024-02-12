import React from 'react'

function EachProperty() {
  return (
    <>
      <div className='flex flex-row'>
        <img class="object-cover object-center w-[60%] rounded-xl mt-24 ml-14"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
          alt="nature image" />
        <div className='flex flex-col'>
          <img class="object-cover object-center w-[80%] h-[100%] rounded-xl mt-24 ml-10"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
            alt="nature image" />
          <img class="object-cover object-center w-[80%] h-[100%] rounded-xl mt-24 ml-10"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
            alt="nature image" />
        </div>
        <figcaption
          className="absolute top-28 left-1/3 flex w-[calc(60%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <h5
              className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Sara Lamalo
            </h5>
            <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              20 July 2022
            </p>
          </div>
          <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Growth
          </h5>
        </figcaption>
      </div>
      <div className='mt-16 ml-16 w-[91%] h-screen flex justify-start'>
        <div className=''> 
          <h1 className='text-4xl font-bold font-custom'>About This Property</h1>
        </div>
      </div>
    </>
  )
}

export default EachProperty
