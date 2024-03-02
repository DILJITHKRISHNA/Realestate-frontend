import React, { useEffect, useState } from 'react'
import { HomeIcon, SearchIcon } from '@heroicons/react/solid';
import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import AddDetails from './AddDetails';
import { GetProperty, HideProperty, PaginateProperty } from '../../../Api/OwnerApi';
import EditProperty from './EditProperty';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function PropertyPage() {

  const navigate = useNavigate()
  const [open, SetOpen] = useState(false)
  const [propertyData, setPropertyData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [propertiesToDisplay, setPropertiesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const selector = useSelector(state => state.owner.OwnerInfo)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpen = (e) => {
    e.preventDefault()
    if (selector.is_kyc === false) {
      toast.error("Add Kyc to get access to manage property!")
    } else {
      SetOpen(true)
    }
  }

  useEffect(() => {

    const FetchProperty = async () => {
      try {
        const result = await GetProperty()
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
  const fetchProperties = async () => {
    try {
      const response = await PaginateProperty(currentPage, selector.id);
      console.log(response, "resppppp in ownere paginate");
      const datas = response.data.PropertyData
      const filteredData = datas.filter((item) => item.ownerRef === selector.id)
      console.log(selector.id, "filterereddeata");
      setPropertiesToDisplay(filteredData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [currentPage])

  const handleHide = async (id, is_hide) => {
    try {
      const res = await HideProperty(id)
      const hideProperty = propertyData.map((data) => {
        if (data._id === id) {
          return { ...data, is_hide: !is_hide };
        }
        return data;
      });
      setPropertiesToDisplay(hideProperty);
    } catch (error) {
      console.log(error);
    }
  }
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
            <input
              type='text'
              placeholder='Search Properties'
              className='border-2 text-center border-black p-2 rounded-lg h-[80%]'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button onClick={handleOpen} className='flex items-center uppercase bg-black text-white hover:text-black rounded-lg py-2 px-6 h-8 hover:bg-white border-2'>
            <HomeIcon className='w-6 h-6 text-white hover:text-black' />
            Add New Property
          </button>
        </div>
        {propertiesToDisplay.filter((property) =>
          property.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((data) => (
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
                      < EditProperty Data={data} propertyId={data._id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div >

      ) : (
        <AddDetails SetOpen={SetOpen} />
      )
      }
      {propertiesToDisplay.length !== 0 ? (
        <div className="pagination flex justify-center gap-4 mr-20 p-10">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`
            bg-white text-gray-800 font-semibold py-2 px-4 border border-lime-300 rounded-full 
            transition-all duration-300 hover:bg-gray-200 focus:outline-none  focus:border-lime-400
            ${currentPage === index + 1 ? 'bg-lime-100 text-black hover:bg-lime-400' : ''}
        `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      ) : (
        <div className='flex justify-center mt-[10%] '>

          <h1 className='text-4xl font-extrabold'><span className='text-lime-400'>No</span> Properties Found!</h1>
        </div>
      )}

    </>
  )
}

export default PropertyPage
