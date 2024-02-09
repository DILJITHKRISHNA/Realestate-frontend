import React, { useEffect, useState } from 'react';
import { AddProperty } from '../../../Api/OwnerApi';
import { Navigate } from 'react-router-dom';

function AdditionalDetails({ SetData, data }) {
  console.log(data, 'pwpwpwpwpwpw');

  const [additional, setAdditional] = useState({
    buildUpArea: '',
    NoOfBedrooms: '',
    NoOFBathrooms: '',
    NoOfBalconies: '',
    waterAccessibility: '',
    NoOfFloors: '',
  });

  // Set the initial state using the data prop
  const [property, setProperty] = useState(data);

  const handleClick = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    try {
      setAdditional({
        ...additional,
        [name]: value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(additional, 'dataaaaaaaaaaaa from additional');
  console.log(property, 'dataaaaaaaaaaaa from property');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // SetData for the parent component
      setProperty(() => ({ ...property, ...additional }));
  
      console.log(property, '__________________');
  
      const res = await AddProperty(property);
      console.log(res,"ressssssssssssssssst in pieceeee");
  
      // Clear the additional state
      setAdditional({
        buildUpArea: '',
        NoOfBedrooms: '',
        NoOFBathrooms: '',
        NoOfBalconies: '',
        waterAccessibility: '',
        NoOfFloors: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto flex items-center justify-center">
      <div className="relative w-[80%] bg-gray-300 p-8 max-w-4xl max-h-2xl h-[90%] mx-auto rounded-lg shadow-black">
        <h1 className="text-2xl font-bold mb-6">AdditionalDetails</h1>
        <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Example input field with label */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Build Up Area</label>
                            <input
                                type="text"
                                name="buildUpArea"
                                value={additional.buildUpArea}
                                onChange={handleClick}
                                placeholder="Enter Property Name"
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">No. Of Bedrooms</label>
                            <input
                                type="text"
                                name="NoOfBedrooms"
                                value={additional.NoOfBedrooms}
                                onChange={handleClick}
                                placeholder="Enter Property Name"
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">No. of Bathrooms</label>
                            <input
                                type="text"
                                name="NoOFBathrooms"
                                value={additional.NoOFBathrooms}
                                onChange={handleClick}
                                placeholder="Enter Property Name"
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">No. of Balconies</label>
                            <input
                                type="text"
                                name="NoOfBalconies"
                                value={additional.NoOfBalconies}
                                onChange={handleClick}
                                placeholder="Enter Property Name"
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Water Accessibility</label>
                            <input
                                type="text"
                                name="waterAccessibility"
                                value={additional.waterAccessibility}
                                onChange={handleClick}
                                placeholder="Enter Property Name"
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">No. of Floors</label>
                            <input
                                type="text"
                                name="NoOfFloors"
                                value={additional.NoOfFloors}
                                onChange={handleClick}
                                placeholder="Enter Property Name"
                                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mt-10 flex  gap-10 justify-end">
                            <div className='flex justify-end gap-10'>
                                <button
                                    // onClick={PrevPage}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-md text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                type='submit'
                                    // onClick={handleChange}
                                    className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-md text-white"
                                >
                                    Add Property
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdditionalDetails
