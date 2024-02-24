import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon } from '@heroicons/react/solid';
import { FaEdit } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import AddDetails from './AddDetails';
import { GetProperty, HideProperty } from '../../../Api/OwnerApi';
import EditProperty from './EditProperty';

function PropertyPage() {

  const navigate = useNavigate()
  const [open, SetOpen] = useState(false)
  const [propertyData, setPropertyData] = useState([])

  const handleOpen = (e) => {
    console.log('lllllllll');
    e.preventDefault()
    SetOpen(true)
  }

  useEffect(() => {

    const FetchProperty = async () => {
      try {
        const result = await GetProperty()
        console.log(result, "got the dataaaaaa");
        if (result.data.success) {
          console.log(result.data.property, "propertyy dattat");
          setPropertyData(result.data.property);
        }
      } catch (error) {
        console.log("Fetch property", error);
      }
    }
    FetchProperty()
  }, [])

  useEffect(() => {},[])

    const handleHide = async (id, is_hide) => {
      try {
        const res = await HideProperty(id)
        console.log(res, "res in hide property frontend");
        const hideProperty = propertyData.map((data) => {
          if (data._id === id) {
            return { ...data, is_hide: !is_hide };
          }
          return data;
        });
        setPropertyData(hideProperty);
      } catch (error) {
        console.log(error);
      }
    }



  return (
    <>
      {!open ? (<div className='bg-white flex flex-col items-center justify-center h-full w-full'>

        <div className='flex mt-8  w-[80%] justify-around'>
          <h1 className='uppercase font-semibold text-lg mr-4 inline-flex items-center mb-6'>
            <HomeIcon className='w-6 h-6 text-black mr-2' />
            Property List
          </h1>
          <div className='mb-4'>
            <SearchIcon className='absolute w-4 h-8 ml-2 text-black' />
            <input type='text' placeholder='Search Properties' className='border-2 text-center border-black p-2 rounded-lg h-[80%] ' />
          </div>
          <button onClick={handleOpen} className='flex items-center uppercase bg-black text-white hover:text-black rounded-lg py-2 px-6 h-8 hover:bg-white border-2'>
            <HomeIcon className='w-6 h-6 text-white hover:text-black' />
            Add New Property
          </button>
        </div>
        {propertyData.map((data) => (
          <div className='flex w-[90%] justify-center'>
            <div className='flex flex-col pb-4 mb-4 w-[90%] bg-white rounded-sm shadow-md shadow-black'>
              <div className='flex flex-col'>
                {data.imageUrls.map((imageUrl, index) => (
                  <div key={index} className='flex flex-row '>
                    <img
                      src={imageUrl}
                      alt={`Image ${index}`}
                      className='w-[20%] h-auto max-h-48 object-cover rounded-lg ml-2 mt-4'
                    />
                    <div className='flex flex-col mx-3 my-4 font-mono'>
                      <div className='flex flex-row'>

                      <h1 className={`border-2 bg-green-800 w-24 px-1 text-white text-center ${data.is_verified ? 'bg-green-800' : 'bg-red-500'}`}>{data.is_verified === true ? "Verified" : "Unverified"}</h1>
                      {/* <h1 className={`border-2 bg-green-800 w-24 px-1 text-white text-center ${data.is_Booked ? 'bg-green-800' : 'bg-red-600'}`}>{data.is_Booked === true ? "Owned" : ""}</h1> */}
                      </div>
                      <p className="font-semibold uppercase tracking-wide text-base">{data.name}</p>
                      <p className="font-medium uppercase tracking-wide text-base">₹{data.Rent}</p>
                      <p className="font-medium uppercase tracking-wide text-base">{data.location}</p>
                      <div className='border-b-2 border-black w-82 mt-1'></div>

                      <div className='flex flex-row gap-14'>
                        <h1 className='text-lime-400'>Bedroom:<span className='font-semibold text-black'>0{data.bedrooms}</span></h1>
                        <h1 className='text-lime-400'>Bathroom:<span className='font-semibold text-black '>0{data.bathrooms}</span></h1>
                        <h1 className='text-lime-400'>Total Floor:<span className='font-semibold text-black'>0{data.FloorCount}</span></h1>
                      </div>
                      <div className='border-b-2 border-black w-82 mt-4'></div>
                      <div className='flex flex-row gap-5 mt-2'>
                        <h1 className='text-lime-400'>Balconies: <span className='font-semibold text-black'>0{data.balcony}</span></h1>
                        <h1 className='text-lime-400'>Parking: <span className='font-semibold text-black'>{data.parking === true ? "Available" : "No"}</span></h1>
                        <h1 className='text-lime-400 '>Furnished: <span className='font-semibold text-black'>{data.furnished === true ? "Yes" : "No"}</span></h1>
                      </div>
                      <div className='border-b-2 border-black w-82 mt-2'></div>
                    </div>
                    <div className='w-auto flex flex-col col-span-3 md:col-span-2 lg:col-span-3 p-2'>
                      {propertyData && data.is_hide === false ? (
                        <button
                          onClick={() => handleHide(data._id)}
                          className='ml-96 bg-lime-400 h-8 mt-24 px-6 font-semibold text-white hover:bg-white hover:border-2
                       hover:border-lime-400 hover:text-lime-400 rounded-md'>Hide</button>
                      ) : (
                        <button
                          onClick={() => handleHide(data._id, data.is_hide)}
                          className='ml-96 bg-red-600 h-8 mt-24 px-6 font-semibold text-white hover:bg-white hover:border-2
                         hover:border-red-600 hover:text-red-600 rounded-md'>Unhide</button>
                      )}
                      <EditProperty propertyId={data._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div >
      ) : (
        <AddDetails SetOpen={SetOpen} />

      )
      }


    </>
  )
}

export default PropertyPage
