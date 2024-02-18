import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
function SuccessPage() {
  const navigate = useNavigate()
  const handleClick = () => {
    toast("Redirected to home")
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center mt-12'>
        <div className=''>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/payment-success-4320185-3598820.png" alt="" className=''/>
          <div className='text-center font-semibold ml-14 mb-10'>
            <h1 className='mb-6 font-semibold text-4xl text-lime-400'>Success</h1>
            <h1 className='font-sans text-xl'>Your payment has been processed successfully</h1>
            <h1 className='mt-4 font-thin text-md'>Page while be automatically redirected to the main page or click button below</h1>
            <div className='mt-12'>
              <button onClick={handleClick} className='border-2 border-lime-400 p-2 rounded-md text-lime-400 hover:bg-lime-400 hover:text-white'>Back to home</button>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  )
}

export default SuccessPage
