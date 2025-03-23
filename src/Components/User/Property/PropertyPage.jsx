import React, { useEffect, useState } from 'react';
import PropertyList from './PropertyList';
import { FetchCategory, FetchPropertyData } from '../../../Api/UserApi';

function PropertyPage() {
  const [propertyType, setPropertyType] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchTitle, setSearchTitle] = useState(0);
  const [searchLocation, setSearchLocation] = useState(0);
  const [loadData, setLoadData] = useState([]);
  const [category, setCategory] = useState([]);
  const [numBedrooms, setNumBedrooms] = useState(0);
  const [numBathrooms, setNumBathrooms] = useState(0);
  const [minSqFootage, setMinSqFootage] = useState(0);
  const [maxSqFootage, setMaxSqFootage] = useState(0);

  useEffect(() => {
    const getProperty = async () => {
      const res = await FetchPropertyData();
      if (res.data.success) {
        setLoadData(res.data.data);
      }
    };
    getProperty();
  }, []);

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await FetchCategory();
        if (res.data.success) {
          setCategory(res.data.categoryList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCat();
  }, []);

  const handleTypeChange = (e) => {
    e.preventDefault();
    setPropertyType(e.target.value);
  };

  const FilterForm = () => (
    <div className='ml-6 flex flex-col w-[85%]'>
      <label className='text-white font-jura'>Property Type</label>
      <select
        value={propertyType}
        onChange={handleTypeChange}
        className='mt-4 h-8 rounded-lg'
      >
        <option value='null'>Select Property Type</option>
        {category.map((data, index) => (
          <option key={index} value={data.category}>{data.category}</option>
        ))}
      </select>

      <label className='text-white font-jura mt-4'>Search By Title</label>
      <input
        type='text'
        onChange={(e) => setSearchTitle(e.target.value || 0)}
        className='mt-4 h-8 rounded-lg p-2'
        placeholder='Search By Title'
      />

      <label className='text-white font-jura mt-4'>Search By Location</label>
      <input
        type='text'
        onChange={(e) => setSearchLocation(e.target.value || 0)}
        className='mt-4 h-8 rounded-lg p-2'
        placeholder='Search By Location'
      />

      <label className='text-white font-jura mt-4'>Budget</label>
      <section className='flex flex-row gap-2'>
        <input
          type='text'
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          className='mt-4 h-8 w-28 rounded-lg p-2'
          placeholder='Minimum'
        />
        <span className='text-white mt-5'>to</span>
        <input
          type='text'
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          className='mt-4 h-8 w-28 rounded-lg p-2'
          placeholder='Maximum'
        />
      </section>

      {/* <label className='text-white font-jura mt-4'>Number of Bedrooms</label>
      <input
        type='number'
        min='0'
        onChange={(e) => setNumBedrooms(e.target.value)}
        className='mt-4 h-8 rounded-lg p-2'
        placeholder='Number of Bedrooms'
      />

      <label className='text-white font-jura mt-4'>Number of Bathrooms</label>
      <input
        type='number'
        min='0'
        onChange={(e) => setNumBathrooms(e.target.value)}
        className='mt-4 h-8 rounded-lg p-2'
        placeholder='Number of Bathrooms'
      />

      <label className='text-white font-jura mt-4'>Minimum Square Footage</label>
      <input
        type='number'
        min='0'
        onChange={(e) => setMinSqFootage(e.target.value)}
        className='mt-4 h-8 rounded-lg p-2'
        placeholder='Minimum Sq Ft'
      />

      <label className='text-white font-jura mt-4'>Maximum Square Footage</label>
      <input
        type='number'
        min='0'
        onChange={(e) => setMaxSqFootage(e.target.value)}
        className='mt-4 h-8 rounded-lg p-2'
        placeholder='Maximum Sq Ft'
      /> */}
    </div>
  );

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen w-full p-4">
      {/* Filter sidebar - appears first on mobile */}
      <div className="w-full lg:w-1/4 mb-8 lg:mb-0 mt-16 lg:mt-0 lg:order-2">
        <div className="lg:fixed lg:top-24 lg:right-12 lg:w-[450px] w-full bg-black rounded-2xl border border-red-500 p-4">
          {FilterForm()}
        </div>
      </div>

      {/* Main content area */}
      <div className="w-full lg:w-3/4 lg:pr-4 lg:order-1">
        {loadData.length > 0 ? (
          <div className="mt-4 lg:mt-24 pl-0 lg:pl-8">
            <PropertyList
              propertyType={propertyType}
              searchTitle={searchTitle}
              searchLocation={searchLocation}
              priceRange={priceRange}
              numBedrooms={numBedrooms}
              numBathrooms={numBathrooms}
              minSqFootage={minSqFootage}
              maxSqFootage={maxSqFootage}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-full mt-4 lg:mt-24 pl-0 lg:pl-8">
            <h1 className="text-xl font-semibold">Property is empty</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyPage;
