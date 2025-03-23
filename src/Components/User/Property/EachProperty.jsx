import React, { useEffect, useState } from 'react'
import { faBed, faBath, faChair, faParking, faDownLeftAndUpRightToCenter, faHouseFloodWater, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchData, FetchPropertyData, IsBooked } from '../../../Api/UserApi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import BookProperty from '../Booking/BookProperty';
import PropertyVideo from './PropertyVideo';
import PropertyShare from './PropertyShare';
import PropertyReview from './PropertyReview';
import MapContainer from '../MapContainer/MapContainer';

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
      if (propertyData) {
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
      <div className="max-w-[100vw] overflow-x-hidden mt-24">
        <div className="relative flex flex-col lg:flex-row gap-4 px-2 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          <div className='w-full lg:w-2/3'>
            <img
              className="object-cover object-center w-full h-[300px] sm:h-[400px] lg:h-[600px] rounded-xl"
              src={property.imageUrls && property.imageUrls[0]}
              alt="nature image"
            />
          </div>

          <div className='flex flex-col h-full justify-between lg:w-1/3 space-y-2 sm:space-y-4'>
            {property.imageUrls && property.imageUrls.slice(1, 4).map((imageUrl, index) => (
              <img
                key={index + 1}
                className="object-cover object-center w-full h-44 sm:h-64 md:h-72 lg:h-[290px] rounded-xl"
                src={imageUrl}
                alt={`nature image ${index + 1}`}
              />
            ))}
          </div>
          <figcaption className="absolute mt-12 sm:mt-20 lg:mt-16 left-1/2 lg:left-1/3 transform -translate-x-1/2 w-[95%] sm:w-[60%] lg:w-[calc(60%-4rem)] flex justify-between rounded-xl border border-white bg-white/75 py-3 sm:py-4 px-4 sm:px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <h5 className="block font-sans text-lg sm:text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {property.type}
              </h5>
              <p className="block mt-1 sm:mt-2 font-sans text-sm sm:text-base antialiased font-normal leading-relaxed text-gray-700">
                {formattedDate}
              </p>
            </div>
            <PropertyVideo videoUrl={property.videoUrls} className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900" />
          </figcaption>
        </div>

        {/* Property details section */}
        <div className='mt-6 sm:mt-8 lg:mt-14 px-2 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row lg:gap-8'>
          <div className='w-full lg:w-[65%] p-3 sm:p-4 lg:p-8 bg-white rounded-xl shadow-sm'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold font-custom'>{property.name}</h1>
            <span className='text-sm sm:text-base p-1 font-semibold'>{property.location}</span>
            <p className='mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 leading-snug tracking'>
              {property.details}
            </p>
            <button className='mt-4 sm:mt-6 border-2 border-lime-400 text-lime-400 px-3 py-1 sm:p-2 text-sm sm:text-base font-mono hover:text-white hover:bg-lime-400 rounded'>LEARN MORE</button>
            <h2 className='mt-4 sm:mt-6 font-bold text-xl sm:text-2xl'>₹{property.Rent}/month</h2>
            
            {/* Property features */}
            <div className='mt-6 sm:mt-8 border-b-2 border-black'></div>
            <div className='mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              <div className='flex items-center'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faBed} size='lg' className="sm:text-2xl" />
                </div>
                <span className='ml-2 text-base sm:text-lg font-thin'>Bedrooms <span className='text-lime-700 font-mono'>0{property.bedrooms}</span></span>
              </div>
              <div className='flex items-center'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faBath} size='lg' className="sm:text-2xl" />
                </div>
                <span className='ml-2 text-base sm:text-lg font-thin'>Bathrooms <span className='text-lime-700 font-mono'>0{property.bathrooms}</span></span>
              </div>
              <div className='flex items-center'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faHouseFloodWater} size='lg' className="sm:text-2xl" />
                </div>
                <span className='ml-2 text-base sm:text-lg font-thin'>Total Floor <span className='text-lime-700 font-mono'>0{property.FloorCount}</span></span>
              </div>
            </div>

            <div className='mt-6 sm:mt-8 border-b-2 border-black'></div>
            <div className='mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              <div className='flex items-center'>
                <div className='text-lime-400 mr-4'>
                  <FontAwesomeIcon icon={faChair} size='lg' className="sm:text-2xl" />
                </div>
                <span className='text-base sm:text-lg font-thin'>Balconies <span className='text-lime-700 font-mono'>0{property.balcony}</span></span>
              </div>
              <div className='flex items-center'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faParking} size='lg' className="sm:text-2xl" />
                </div>
                <span className='ml-2 text-base sm:text-lg font-thin'>Parking: <span className='text-lime-700 font-mono'>{property.parking === false ? "Available" : "No"}</span></span>
              </div>
              <div className='flex items-center'>
                <div className='text-lime-400'>
                  <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} size='lg' className="sm:text-2xl" />
                </div>
                <span className='ml-2 text-base sm:text-lg font-thin'>Furnished: <span className='text-lime-700 font-mono'>{property.furnished ? 'Yes' : 'No'}</span></span>
              </div>
            </div>
            <div className='mt-8 sm:mt-12 border-b-2 border-black'></div>
          </div>

          {/* More about section */}
          <div className='mt-6 sm:mt-8 lg:mt-0 w-full lg:w-[35%] p-3 sm:p-4 lg:p-8 bg-white rounded-xl shadow-md shadow-lime-200'>
            <h1 className='font-bold text-base sm:text-lg bg-lime-400 w-full text-white text-center rounded-md py-2'>MORE ABOUT</h1>
            <ul className='mt-4 sm:mt-6 space-y-3 sm:space-y-4 uppercase text-sm sm:text-base'>
              <li className='font-mono'>Property id: {property._id}</li>
              <li className='font-mono'>Parking: {property.parking === false ? "Available" : "No"}</li>
              <li className='font-mono'>Total floor: {property.FloorCount}</li>
              <li className='font-mono'>Balconies: {property.balcony}</li>
              <li className='font-mono'>Bedrooms: {property.bedrooms}</li>
              <li className='font-mono'>Furnished: {property.furnished ? 'Yes' : 'No'}</li>
              <li className='font-mono'>Bathrooms: {property.bathrooms}</li>
            </ul>
            <div className='mt-6 sm:mt-8'>
              <div className='w-full flex flex-col lg:flex-row justify-between items-center gap-4'>
                <div className='w-24 sm:w-28 mt-8 lg:mt-12'>
                  <PropertyShare propertyId={property._id} />
                </div>
                <div className='flex gap-3 mt-8 lg:mt-12'>
                  <button className='w-24 sm:w-28 h-10 font-mono border-2 border-lime-400 text-lime-400 text-sm sm:text-base hover:text-white hover:bg-lime-400 rounded-md whitespace-nowrap' onClick={handleReserve}>Reserve</button>
                  <button className='w-24 sm:w-28 h-10 font-mono border-2 border-lime-400 text-lime-400 text-sm sm:text-base hover:text-white hover:bg-lime-400 rounded-md whitespace-nowrap' onClick={handleBook}>Book</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location section */}
        <div className='mt-6 sm:mt-8 mx-2 sm:mx-6 lg:mx-8 border-2 border-lime-200 shadow-md shadow-lime-200 rounded-xl overflow-hidden'>
          <div className='flex flex-col lg:flex-row'>
            <div className='w-full lg:w-1/2 h-48 sm:h-60 lg:h-auto'>
              {property.imageUrls && property.imageUrls.length > 0 && (
                <img src={property.imageUrls[1]} alt="" className='w-full h-full object-cover' />
              )}
            </div>
            <div className='w-full lg:w-1/2 p-4 sm:p-6'>
              <div className='text-black'>
                <h1 className='font-bold text-base sm:text-lg bg-lime-400 w-full text-white text-center rounded-md py-2 mb-4 sm:mb-6'>LOCATION DETAILS</h1>
                <ul className='space-y-3 sm:space-y-4 uppercase text-base sm:text-lg'>
                  <li className='font-mono'>Location: {property.location}</li>
                  <li className='font-mono'>State: {property.state}</li>
                  <li className='font-mono'>Country: {property.country}</li>
                  <li className='font-mono'>City: {property.city}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Map section */}
        <div className='w-full px-2 sm:px-6 lg:px-8 pt-6 sm:pt-10 mt-6 sm:mt-8'>
          <h1 className='text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4'>Here you can check where the property is located:</h1>
          <div className='w-[102%] -ml-2 sm:-ml-4 lg:-ml-6 transition-all duration-300'>
            <MapContainer propertyId={property._id}/>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}

export default EachProperty
