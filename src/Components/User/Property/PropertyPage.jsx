import React, { useEffect, useState } from 'react'
import PropertyList from './PropertyList'
import { FetchCategory, FetchPropertyData } from '../../../Api/UserApi';
import { FaCreativeCommonsSa } from 'react-icons/fa';

function PropertyPage() {

  const [propertyType, setPropertyType] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTitle, setSearchTitle] = useState(0);
  const [searchLocation, setSearchLocation] = useState(0);
  const [loadData, SetLoadData] = useState([])
  const [category, setCategory] = useState([])

  

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await FetchCategory()
        console.log(res, "reddddddddddddddd");
        if (res.data.success) {
          setCategory(res.data.categoryList);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCat()
  }, [])

  const handleTypeChange = (e) => {
    e.preventDefault()
    const selectedValue = e.target.value

    setPropertyType(selectedValue)
  }


  return (
    <>
      {loadData ? (
        <div className='flex flex-wrap mt-16'>
          <div className='w-[66%] mt-[29rem] lg:h-auto h-full lg:mt-8 ml-10 rounded-2xl p-2 '>
            <PropertyList propertyType={propertyType} searchTitle={searchTitle} searchLocation={searchLocation} priceRange={priceRange} />
          </div>
          <div className='absolute w-full sm:w-[28%] h-[27rem] mt-2 ml-[65rem] lg:mt-12 mr-4 bg-black  rounded-2xl '>
            <div className='p-6 mt-2 gap-1'>
              <h1 className='text-white font-league-spartan text-lg font-bold flex justify-between'>
                Find Your Property
              </h1>
            </div>

            <div className='ml-6 flex flex-col w-[85%]'>
              <label className='text-white font-jura'>Property Type</label>
              <select
                value={propertyType}
                onChange={handleTypeChange}
                className='mt-4 h-8 rounded-lg'
              >
                <option value="null"  >Select Property Type</option>
                {category.map((data, index) => (
                  <option key={index} value={data.category}>{data.category}</option>
                ))}
              </select>
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Search By Title</label>
              <input
                type="text"
                onChange={(e) => {
                  e.target.value.length !== 0
                    ? setSearchTitle(e.target.value)
                    : setSearchTitle(0);
                }}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Search By Title'
              />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Search By Location</label>
              <input
                type="text"
                onChange={(e) => {
                  e.target.value.length !== 0
                    ? setSearchLocation(e.target.value)
                    : setSearchLocation(0);
                }}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Search By location'
              />
            </div>
            <div className='ml-6 flex flex-col mt-2'>
              <label className='text-white font-jura'>Budget</label>
              <section className='flex flex-row gap-2'>
                <input
                  type="text"
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className='mt-4 h-8 w-28 rounded-lg p-2'
                  placeholder='Minimum'
                />
                <span className='text-white mt-5'>to</span>
                <input
                  type="text"
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className='mt-4 h-8 w-28 rounded-lg p-2'
                  placeholder='Maximum'
                />
              </section>

            </div>
            {/* Inside your PropertyPage component */}
            {/* <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Number of Bedrooms</label>
              <input
                type="number"
                min="0"
                onChange={(e) => setNumBedrooms(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Number of Bedrooms'
              />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Number of Bathrooms</label>
              <input
                type="number"
                min="0"
                onChange={(e) => setNumBathrooms(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Number of Bathrooms'
              />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Minimum Square Footage</label>
              <input
                type="number"
                min="0"
                onChange={(e) => setMinSqFootage(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Minimum Square Footage'
              />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Maximum Square Footage</label>
              <input
                type="number"
                min="0"
                onChange={(e) => setMaxSqFootage(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Maximum Square Footage'
              />
            </div> */}
          </div>
        </div>
      ) : (
        <div>
          <h1>Property is empty</h1>
        </div>
      )}
    </>
  )
}

export default PropertyPage
