import React, { useEffect, useState } from 'react'
import PropertyList from './PropertyList'
import { FetchCategory, FetchPropertyData } from '../../../Api/UserApi';
import { FaCreativeCommonsSa } from 'react-icons/fa';

function PropertyPage() {

  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [loadData, SetLoadData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState([])


  useEffect(() => {
    const FetchProperty = async () => {
      console.log("--------========---------");
      try {
        const res = await FetchPropertyData()
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
      console.log('Selected Property Type:', propertyType);
      console.log('Current Property Type:', property.type);
  
      const normalizedSelectedType = propertyType.trim().toLowerCase();
      const normalizedCurrentType = property.type.trim().toLowerCase();
  
      console.log('Normalized Selected Type:', normalizedSelectedType);
      console.log('Normalized Current Type:', normalizedCurrentType);
  
      const isPropertyTypeMatch = !normalizedSelectedType || normalizedCurrentType.includes(normalizedSelectedType);
  

      const minPrice = parseFloat(priceRange.min);
      const maxPrice = parseFloat(priceRange.max);

      const isPriceInRange =
        (isNaN(minPrice) || property.Rent >= minPrice) &&
        (isNaN(maxPrice) || property.Rent <= maxPrice);

      const isTitleMatch = !searchTitle || property.name.toLowerCase().includes(searchTitle.toLowerCase());
      const isLocationMatch = !searchLocation || property.location.toLowerCase().includes(searchLocation.toLowerCase());

      return isPropertyTypeMatch && isPriceInRange && isTitleMatch && isLocationMatch;
    });

    setFiltered(filteredProperties.length > 0 ? filteredProperties : []);
  };

  const handleRefresh = (e) => {
    e.preventDefault()
    window.location.reload();

  }

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
  console.log(category, "cattttlee");

  return (
    <>
      <div className='flex flex-wrap mt-16'>
        <div className='lg:w-[66%] mt-[29rem] lg:h-auto h-full lg:mt-8 ml-10 rounded-2xl p-2 '>
          <PropertyList filtered={filtered} />
        </div>
        <div onChange={handleSearch} className='absolute w-screen h-screen flex justify-end'>
          <div className='w-full sm:w-[28%] h-[26rem] mt-2 ml-12 lg:mt-20 mr-4 bg-black  rounded-2xl '>
            <div className='p-6 mt-2 gap-1'>
              <h1 className='text-white font-league-spartan text-lg font-bold flex justify-between'>
                Find Your Property
                <button onClick={handleRefresh}><FaCreativeCommonsSa className='mr-4 w-5 h-8' /></button>
              </h1>
            </div>

            <div className='ml-6 flex flex-col w-[85%]'>
              <label className='text-white font-jura'>Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className='mt-4 h-8 rounded-lg'
              >
                <option value="" disabled>Select Property Type</option>
                {category.map((data, index) => (
                  <option value={data.category}>{data.category}</option>
                ))}
              </select>
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
             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyPage
