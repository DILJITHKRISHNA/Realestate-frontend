import React, { useEffect, useState } from 'react'
import { faBed, faBath, faChair, faParking, faDownLeftAndUpRightToCenter, faHouseFloodWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchData, FetchPropertyData, IsBooked } from '../../../Api/UserApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import BookProperty from '../Booking/BookProperty';
import PropertyVideo from './PropertyVideo';
import PropertyShare from './PropertyShare';

function EachProperty() {
  const location = useLocation()
  const { id } = location.state
  console.log(location)
  const [property, setProperty] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {

    const getPropertyData = async () => {

      const res = await FetchPropertyData()
      const Details = res.data.data
      const propertyData = Details.find((item) => item._id === id)
      if(propertyData){
        setProperty(propertyData)
      }
    }
    getPropertyData()
  }, [])

  const date = property?.createdAt;
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString();
  console.log(formattedDate, "dateee");

  const handleBook = async (e) => {
    e.preventDefault()
    try {
      const res = await IsBooked(property._id)
      if (res.data.property.is_Booked === false) {
        toast.success("Property Booking is on process..!")
        setTimeout(() => {
          navigate('/bookproperty', { state: { propertyId: property._id } })
        }, 2000);
      } else {
        toast.error("Property is already booked.")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleReserve = () => {
    try {
      toast.success("Property Reservation is on process!")
      setTimeout(() => {
        navigate('/reserve', { state: { propertyId: property._id } })
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row ml-10">
          {property.imageUrls && property.imageUrls.length > 0 && (
            <img
              className="object-cover object-center w-2/3 h-64 md:h-96 lg:h-full rounded-xl mt-4 md:mt-24 lg:mt-24 md:ml-10 lg:ml-14"
              src={property.imageUrls[0]}
              alt="nature image"
            />
          )}

          <div className='flex flex-col justify-between'>
            {property.imageUrls && property.imageUrls.slice(1, 4).map((imageUrl, index) => (
              <img
                key={index + 1}
                className="object-cover object-center w-3/5 h-64 md:h-96 lg:h-[40%] rounded-xl mt-4 md:mt-24 lg:mt-24 md:ml-10 lg:ml-14"
                src={imageUrl}
                alt={`nature image ${index + 1}`}
              />
            ))}
          </div>
          <figcaption className="absolute mt-28 sm:top-2 left-1/3 transform -translate-x-1/2 lg:ml-8 flex w-full lg:w-[calc(60%-4rem)] justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {property.type}
              </h5>
              <p className="block mt-2 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {formattedDate}
              </p>
            </div>
            <PropertyVideo videoUrl={property.videoUrls} className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900" />
          </figcaption>
        </div>
        <div className='mt-4 lg:mt-14 ml-4 lg:ml-16 w-full lg:w-[91%] h-screen flex flex-col lg:flex-row'>
          <div className='w-full lg:w-[90%] p-8'>
            <h1 className='text-4xl font-bold font-custom'>{property.name}</h1>
            <span className='p-1 font-semibold'>{property.location}</span>
            <p className='mt-6 text-lg text-gray-700 leading-snug tracking'>
              {property.details}
            </p>
            <button className='mt-6 border-2 border-lime-400 text-lime-400 p-2 font-mono hover:text-white hover:bg-lime-400'>LEARN MORE</button>
            <h2 className='mt-6 font-bold text-2xl'>₹{property.Rent}/month</h2>
            <div className='mt-8 border-b-2 border-black'></div>
            <div className='flex justify-around items-center mb-4 sm:mb-0 gap-20'>
              <div className='flex items-center mt-6'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faBed} size='2x' />
                </div>
                <span className='ml-2 text-lg font-thin'>Bedrooms <span className='text-lime-700 font-mono'>0{property.bedrooms}</span></span>
              </div>
              <div className='flex items-center ml-4 mt-6'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faBath} size='2x' />
                </div>
                <span className='ml-2 text-lg font-thin'>Bathrooms <span className='text-lime-700 font-mono'>0{property.bathrooms}</span></span>
              </div>
              <div className='flex items-center mt-6'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faHouseFloodWater} size='2x' />
                </div>
                <span className='ml-2 text-lg font-thin'>Total Floor <span className='text-lime-700 font-mono'>0{property.FloorCount}</span></span>
              </div>
            </div>
            <div className='mt-8 border-b-2 border-black'></div>
            <div className='flex justify-around ml-2 items-center mt-4 sm:mb-0 gap-24'>
              <div className='flex items-center'>
                <div className='text-lime-400 mr-4'>
                  <FontAwesomeIcon icon={faChair} size='2x' />
                </div>
                <span className=' text-lg font-thin'>Balconies <span className='text-lime-700 font-mono'>0{property.balcony}</span></span>
              </div>
              <div className='flex items-center ml-14'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faParking} size='2x' />
                </div>
                <span className='ml-2 text-lg font-thin'>Parking: <span className='text-lime-700 font-mono'>{property.parking === false ? "Available" : "No"}</span></span>
              </div>
              <div className='flex items-center ml-4'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} size='2x' />
                </div>
                <span className='ml-2 text-lg font-thin'>Furnished: <span className='text-lime-700 font-mono'>{property.furnished ? 'Yes' : 'No'}</span></span>
              </div>
            </div>
            <div className='mt-12 border-b-2 border-black'></div>
          </div>
          <div className='mt-4 lg:mt-12 w-full lg:w-[40%] h-[77%] p-8  border-black shadow-md shadow-lime-200'>
            <h1 className='mt-2   font-bold text-lg bg-lime-400  w-[100%] text-white text-center'>MORE ABOUT</h1>
            <ul className='mt-4 uppercase'>
              <li className='mt-6 font-mono'>Property id: {property._id}</li>
              <li className='mt-6 font-mono'>Parking: {property.parking === false ? "Available" : "No"}</li>
              <li className='mt-6 font-mono'>Total floor: {property.FloorCount}</li>
              <li className='mt-6 font-mono'>Balconies: {property.balcony}</li>
              <li className='mt-6 font-mono'>Bedrooms: {property.bedrooms}</li>
              <li className='mt-6 font-mono'>Furnished: {property.furnished ? 'Yes' : 'No'}</li>
              <li className='mt-6 font-mono'>Bathrooms:  {property.bathrooms} </li>
            </ul>
            <div className='flex justify-between'>
              <PropertyShare propertyId={property._id} className=''/>
              <button to='/reserve' className='ml-8 mt-12 font-mono border-2 border-lime-400 text-lime-400 px-4 py-1 hover:text-white hover:bg-lime-400' onClick={handleReserve}> Reserve</button>
              <button className='ml-8 mt-12 font-mono border-2 border-lime-400 text-lime-400 px-4 py-1 hover:text-white hover:bg-lime-400' onClick={handleBook}> Book</button>
            </div>
          </div>
        </div>

        <div className='border-2 border-lime-200 shadow-md shadow-lime-200 w-full lg:w-[89%] h-[60vh] mt-4 lg:ml-24 flex flex-col lg:flex-row'>
          {property.imageUrls && property.imageUrls.length > 0 && (
            <img src={property.imageUrls[1]} alt="" className='top-0 h-full w-full object-cover' />
          )}
          <div className='text-black text-2xl font-bold  ml-12 p-2 mr-2 uppercase w-[45%] h-[74%]'>
            <h1 className='mt-2 font-bold text-lg bg-lime-400  w-[100%] text-white text-center'>LOCATION DETAILS</h1>
            <ul className='mt-2 ml-1 uppercase text-lg'>
              <li className='mt-6 font-mono'>Location: {property.location}</li>
              <li className='mt-6 font-mono'>State: {property.state}</li>
              <li className='mt-6 font-mono'>Country: {property.country}</li>
              <li className='mt-6 font-mono'>City: {property.city}</li>
              <div className='flex flex-col'>
                <button className='mt-28 mr-2 border-2 border-lime-400 text-lime-400 px-2  font-mono hover:text-white hover:bg-lime-400 text-center'>Contact</button>
              </div>
            </ul>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default EachProperty
