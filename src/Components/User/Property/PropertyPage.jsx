import React, { useEffect, useState } from 'react'
import PropertyList from './PropertyList'
import { FetchData } from '../../../Api/UserApi';

function PropertyPage() {

  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loadData, SetLoadData] = useState([])
  const [filtered, setFiltered] = useState([])


  useEffect(() => {
    const FetchProperty = async () => {
      console.log("--------========---------");
      try {
        const res = await FetchData()
        console.log(res.data, "responseee to fetch properttyy");
        const property = res.data.data
        SetLoadData(property || []);
      } catch (error) {
        console.log(error);
      }
    }
    FetchProperty()
  }, [])

  const handleSearch = () => {
    const filteredProperties = loadData.filter((property) => {
      const isPropertyTypeMatch = !propertyType || property.type.toLowerCase().includes(propertyType.toLowerCase());
      const isPriceInRange =
        (!priceRange.min || property.Rent >= priceRange.min) &&
        (!priceRange.max || property.Rent <= priceRange.max);
      const isTitleMatch = !searchTitle || property.name.toLowerCase().includes(searchTitle.toLowerCase());
      const isLocationMatch = !searchLocation || property.location.toLowerCase().includes(searchLocation.toLowerCase());
      return isPropertyTypeMatch && isPriceInRange && isTitleMatch && isLocationMatch;
    });

    setFiltered(filteredProperties);
  };

  return (
    <>
      <div onChange={handleSearch} className='flex flex-wrap mt-16'>
        <div className='z-10 lg:w-[66%] lg:h-auto h-full mt-8 ml-10 rounded-2xl p-2'>
          <h1 className='text-white font-league-spartan text-lg font-bold'>Left Box</h1>
          <PropertyList filtered={filtered} />
        </div>
        <div className='absolute w-screen h-screen flex justify-end'>
          <div className='w-[28%] h-[70%] mt-20 mr-10 bg-black rounded-2xl'>
            <div className='p-6 mt-2'>
              <h1 className='text-white font-league-spartan text-lg font-bold'>
                Find Your <span className='bg-white text-black px-1'>Property</span>
              </h1>
            </div>
            <div className='ml-6 flex flex-col w-[85%]'>
              <label className='text-white font-jura'>Property Type</label>
              <input
                type="text"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Search By Type'
              />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Search By Title</label>
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Search By Title'
              />
            </div>
            <div className='ml-6 flex flex-col w-[85%] mt-2'>
              <label className='text-white font-jura'>Search By Location</label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className='mt-4 h-8 rounded-lg p-2'
                placeholder='Search By location'
              />
            </div>
            <div className='ml-6 flex flex-col mt-2'>
              <label className='text-white font-jura'>Budget</label>
              <section className='flex flex-row gap-2'>
                <input
                  type="text"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className='mt-4 h-8 w-28 rounded-lg p-2'
                  placeholder='Minimum'
                />
                <span className='text-white mt-5'>to</span>
                <input
                  type="text"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className='mt-4 h-8 w-28 rounded-lg p-2'
                  placeholder='Maximum'
                />
              </section>
              {/* <button
                onClick={handleSearch}
                className='items-center w-auto mr-8 mt-8 border-2
                 border-white text-white rounded-md
                hover:text-black hover:bg-white'>Search</button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyPage
