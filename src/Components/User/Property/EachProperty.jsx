import React, { useEffect, useState } from 'react'
import { faBed, faBath, faChair, faParking, faDownLeftAndUpRightToCenter, faHouseFloodWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchData, GetImages } from '../../../Api/UserApi';
import { useLocation, useParams } from 'react-router-dom';

function EachProperty() {

  const location = useLocation()
  const { id } = location.state
  const [property, setProperty] = useState([]);
  const [imageId, setImageId] = useState([])


  useEffect(() => {
    const getImages = async () => {
      console.log("getImages ");
      try {
        const ImageData = await GetImages()
        console.log(ImageData, "images dataa res in frontednddndnd");
        if (ImageData) {
          setImageId(ImageData)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getImages()
  }, [])

  useEffect(() => {

    const getPropertyData = async () => {

      const res = await FetchData()
      const Details = res.data.data
      const date = Details[0].createdAt
      const dateObject = new Date(date);

      console.log(dateObject, "datee");
      const propertyData = Details.find((item) => item._id === id)
      console.log(propertyData, "got propertyyy dataaaaa");
      
      setProperty(propertyData )
    }
    getPropertyData()
  }, [])

  const date = property.createdAt;
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString();

  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row ml-10">
          <img
            className="object-cover object-center w-full lg:w-[60%] h-[20%] lg:h-[100%] rounded-xl mt-4 lg:mt-24 lg:ml-14"
            src="/src/assets/images/interiorproperty.jpg"
            alt="nature image"
          />

          <div className='flex flex-col'>
            <img
              className="object-cover object-center w-full lg:w-[76%] h-[40%] lg:h-[50%] rounded-xl mt-4 lg:mt-24 lg:ml-10"
              src="/src/assets/images/interiorproperty.jpg"
              alt="nature image"
            />
            <img
              className="object-cover object-center w-full lg:w-[76%] h-[38%] lg:h-[50%] rounded-xl mt-4 lg:ml-10"
              src="/src/assets/images/interiorproperty.jpg"
              alt="nature image"
            />
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
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Growth
            </h5>
          </figcaption>
        </div>
        <div className='mt-4 lg:mt-14 ml-4 lg:ml-16 w-full lg:w-[91%] h-screen flex flex-col lg:flex-row'>
          <div className='w-full lg:w-[90%] p-8'>
            <h1 className='text-4xl font-bold font-custom'>{property.name}</h1>
            <span>{property.location}</span>
            <p className='mt-6 text-lg text-gray-700 leading-snug tracking'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
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
              <button className='mt-12 font-mono border-2 border-lime-400 text-lime-400 px-4 py-1 hover:text-white hover:bg-lime-400 '> SHARE</button>
              <button className='ml-8 mt-12 font-mono border-2 border-lime-400 text-lime-400 px-4 py-1 hover:text-white hover:bg-lime-400 '> Reserve</button>
              <button className='ml-8 mt-12 font-mono border-2 border-lime-400 text-lime-400 px-4 py-1 hover:text-white hover:bg-lime-400 '> Book</button>
            </div>
          </div>
        </div>

        <div className='border-2 border-lime-200 shadow-md shadow-lime-200 w-full lg:w-[89%] h-[60vh] mt-4 lg:ml-24 flex flex-col lg:flex-row'>
          <img src="/src/assets/images/property2.jpg" alt="" className='top-0 w-[50%] ' />
          <div className='text-black text-2xl font-bold  ml-12 uppercase w-[45%] h-[74%]'>
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
      </div>
      dgdf
    </>
  )
}

export default EachProperty
