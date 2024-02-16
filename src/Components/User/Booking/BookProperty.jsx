import React, { useEffect, useState } from 'react'
import { FaStripe } from 'react-icons/fa';
import { IoMdCard } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import { BookingData, FetchData } from '../../../Api/UserApi';



function BookProperty() {

  const location = useLocation();
  const propertyId = location.state?.propertyId;

  const [Payment, setPayment] = useState({
    name: '',
    contact: '',
    email: '',
    relocationDate: ''
  })

  const handleSubmit = async(e) => {
    console.log(Payment, "paymentyyyyyyyyyyyy");
    try {
      const res = await BookingData(Payment, propertyId);
      console.log(res,"res in payment handlesubmitt payment ");
    } catch (error) {
      console.log(error);
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setPayment({
      ...Payment,
      [name]: value
    })
  }
  console.log(Payment, "typing dataaa");


  const [property, setProperty] = useState([]);

  useEffect(() => {

    const getPropertyData = async () => {

      const res = await FetchData()
      const Details = res.data.data
      const date = Details[0].createdAt
      const dateObject = new Date(date);

      console.log(dateObject, "datee");
      const propertyData = Details.find((item) => item._id === propertyId)
      console.log(propertyData, "got propertyyy dataaaaa");

      setProperty(propertyData)
    }
    getPropertyData()
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col lg:flex-row w-[80%] border-2 border-black mt-16'>
        <div className='flex flex-col justify-center w-full lg:w-full p-8'>
          <h3 className='text-xl mb-4 text-white font-mono font-semibold uppercase w-auto bg-amber-900 p-1 text-center'>Details</h3>


          <form onSubmit={handleSubmit}>

            <div className='mb-auto'>
              <label >Name</label>
              <input
                type='text'
                name='name'
                value={Payment.name}
                onChange={handleClick}
                placeholder='Fullname'
                className='border p-2 w-full border-amber-900' />
            </div>
            <div className='mb-4'>
              <label >Contact</label>
              <input type='text'
                value={Payment.contact}
                onChange={handleClick}
                name='contact'
                placeholder='Contact'
                className='border p-2 w-full border-amber-900' />
            </div>

            <div className='mb-4'>
              <label >Email</label>
              <input
                type='email'
                name='email'
                value={Payment.email}
                onChange={handleClick}
                placeholder='Email'
                className='border p-2 w-full border-amber-900' />
            </div>
            <div className='mb-4'>
              <label >Re-Location</label>
              <input
                type='date'
                value={Payment.relocationDate}
                onChange={handleClick}
                name='relocationDate'
                className='border p-2 w-full border-amber-900' />
            </div>
            <h3 className='text-xl mb-auto text-amber-900 font-mono font-semibold uppercase'>Payment Type</h3>


            <div className="">
              <div className=" w-auto border-2 border-gray-200 bg-black flex flex-row">
                <FaStripe className="ml-[40%] text-white" style={{ width: '50px', height: '40px' }} />
              </div>
            </div>
          </form>
        </div>

        <div className='w-full lg:w-auto p-8'>
          <div className='mb-5 lg:flex lg:flex-row'>
            <img
              src={property.imageUrls}
              alt='Property Preview'
              className='mt-auto lg:w-[8%] h-auto lg:h-[10%] rounded-md'
            />
            <div className="lg:ml-10 flex flex-col">
              <p className='text-md font-mono'>Name: {property.name}</p>
              <div className='mt-auto border-b border-amber-900 w-auto '></div>
              <div className='flex flex-row gap-10'>
                <h1 className='text-md font-mono text-amber-900'>Bedroom: 0<span className='text-black font-semibold'>{property.bedrooms}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Bathroom: 0<span className='text-black font-semibold'>{property.bathrooms}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Total Floor: 0<span className='text-black font-semibold'>{property.FloorCount}</span></h1>
              </div>
              <div className='mt-2 border-b border-amber-900 w-auto '></div>
              <div className='flex flex-row gap-10'>
                <h1 className='text-md font-mono text-amber-900'>balcony: 0<span className='text-black font-semibold'>{property.balcony}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Parking: <span className='text-black font-semibold'>{property.parking === true ? "Available" : "No"}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Furnished: <span className='text-black font-semibold'>{property.furnished === true ? "Yes" : "No"}</span></h1>
              </div>
            </div>
          </div>
          <div className='border-b border-amber-900 w-auto'></div>
          <div className='ml6 mt-10 mb-12'>
            <h1 className='text-2xl font-semibold font-mono mb-2 text-amber-900 uppercase'>Property Details</h1>
            <ul className='list-disc pl-6 space-y-4'>
              <li className='mb-2 text-amber-900 font-mono'>Address: <span className='text-black font-semibold'>{property.location}</span></li>
              <li className='mb-2 text-amber-900 font-mono'>Country: <span className='text-black font-semibold'>{property.country}</span></li>
              <li className='mb-2 text-amber-900 font-mono'>City: <span className='text-black font-semibold'>{property.city}</span></li>
              <li className='mb-2 text-amber-900 font-mono'>State: <span className='text-black font-semibold'>{property.state}</span></li>
            </ul>
          </div>
          <div className='mt-auto border-b border-amber-900 w-auto mb-6'></div>
          <div
            className='w-auto border-2 border-gray-200 bg-black flex flex-row hover:bg-black'
            onClick={handleSubmit}
            style={{ cursor: 'pointer' }}
          >
            <IoMdCard className="ml-[40%] text-white" style={{ width: '30px', height: '39px' }} />
            <span className='text-white mt-1 ml-2 text-lg font-bold hover:text-amber-200'>Pay Now</span>
          </div>
        </div>
      </div>
    </div>


  )
}

export default BookProperty
