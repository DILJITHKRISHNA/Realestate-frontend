import React, { useEffect, useState } from 'react';
import Header from '../AdminHeader/Header';
import Sidebar from '../AdminSidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import { ListProperty, PaginateProperty, PropertyStatus } from '../../../Api/AdminApi';
import { PropertyDetails } from '../BookingList/PropertyDetails';
import { FaHome } from 'react-icons/fa';

function PropertyPage() {
  const [listingProperty, setListingProperty] = useState([]);
  const [openPropertyId, setOpenPropertyId] = useState(false);
  const [propertiesToDisplay, setPropertiesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProperty = propertiesToDisplay.filter(
    (data) =>
      String(data.type).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (data.Rent).includes(searchTerm) ||
      String(data.Rent).includes(searchTerm)
  );

  useEffect(() => {
    const handleGetProperty = async () => {
      try {

        const res = await ListProperty();
        const PropertyData = res.data.data || [];
        setListingProperty(PropertyData);
        console.log(PropertyData, "dtaaaaaa");
      } catch (error) {
        console.log(error);
      }
    };
    handleGetProperty();
  }, [openPropertyId]);


  const fetchProperties = async () => {
    try {
      const response = await PaginateProperty(currentPage);
      console.log(response, "resppppp in admin paginate");
      setPropertiesToDisplay(response.data.PropertyData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [currentPage, propertiesToDisplay])

  const handleClick = (propertyId) => {
    setOpenPropertyId(propertyId);
  };

  const closePropertyModal = () => {
    setOpenPropertyId(false);
  };

  const ApproveProperty = async (PropertyId) => {
    closePropertyModal();
    try {
      const approve = await PropertyStatus(PropertyId, 'approve');
      if (approve.data.success) {
        setListingProperty((prevData) =>
          prevData.map((item) =>
            item.id === PropertyId ? { ...item, is_verified: true } : item
          )
        );
        toast.success('Property approved successfully!');
      }
    } catch (error) {
      console.error('Error approving property:', error);
    }
  };

  const DisapproveProperty = async (PropertyId) => {
    closePropertyModal();
    try {
      const disapprove = await PropertyStatus(PropertyId, 'disapprove');
      if (disapprove.data.success) {
        setListingProperty((prevData) =>
          prevData.map((item) =>
            item.id === PropertyId ? { ...item, is_verified: false } : item
          )
        );
        toast.success('Property disapproved successfully!');
      }
    } catch (error) {
      console.error('Error disapproving property:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="mt-2 overflow-y-hidden rounded-lg pt-10 ml-1 bg-offgreen mx-auto h-auto w-screen sm:px-8 bg-gray-100">
            <div className='flex justify-between lg:flex-row flex-col'>
              <h1 className='font-semibold text-xl uppercase font-mono flex flex-row gap-2'>
                <FaHome className='w-8 h-6' />
                Property List
              </h1>
              <h1 className='font-semibold text-xl uppercase font-mono flex flex-row gap-2'>
                <input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border border-black px-2 h-6 mt-2 text-sm rounded-md"
                />              </h1>
            </div>
            <table className="mt-2 w-full">
              <thead>
                <tr className="bg-gray-400 text-left text-xs font-semibold uppercase tracking-widest text-black">
                  <th className="px-5 py-3">Index</th>
                  <th className="px-5 py-3">Property Details</th>
                  <th className="px-5 py-3">Property type</th>
                  <th className="px-5 py-3">Rent Amount</th>
                  <th className="px-5 py-3">Approval</th>
                  <th className="px-5 py-3">Manage</th>
                </tr>
              </thead>
              {filteredProperty.map((data, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="border-gray-200 bg-white px-5 py-5 text-sm">{index + 1}</td>
                    <td className="border-gray-200 bg-white px-5 py-5 text-sm">
                      <PropertyDetails propertyId={data._id} property={data} className='text-lime-400 border-2 border-lime-400 px-2 rounded-md font-semibold hover:bg-lime-400 hover:text-white' />
                    </td>
                    <td className="border-gray-200 bg-white px-5 py-5 text-sm">{data.type}</td>
                    <td className="border-gray-200 bg-white px-5 py-5 text-sm">{data.Rent}</td>
                    <td
                      className={`border-gray-200 bg-white px-5 py-5 text-sm ${data.is_verified === true ? 'text-lime-400 font-bold' : 'text-red-700 font-bold'}`}>
                      {data.is_pending === true ? (
                        <span className='text-amber-900'>Pending</span>
                      ) : (
                        <span>{data.is_verified === true ? "Approved" : "Rejected"}</span>
                      )}
                    </td>
                    <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                      <button
                        onClick={() => handleClick(data._id)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold bg-lime-400 border-2 hover:border-lime-400 hover:text-lime-400 hover:bg-white text-white `}
                      >
                        Status
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <div className="pagination flex justify-center mt-10 gap-4 mr-20 p-4">
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
          </div>
        </div>
        {/* modal */}
        {listingProperty.map((data) => (
          <div
            key={data._id}
            className={`fixed inset-0 ${openPropertyId === data._id ? 'visible' : 'hidden'}`}
          >
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Confirmation!</h2>
                <p className="mb-4">
                  {`Please confirm your decision: Do you want to  approve or reject
                   this request?`}
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => ApproveProperty(data._id)}
                    className="bg-gradient-to-r bg-green-700 rounded-full text-white px-3 py-1 text-xs font-semibold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => DisapproveProperty(data._id)}
                    className="bg-gradient-to-r bg-red-700 rounded-full text-white px-4 py-2 text-xs font-semibold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* modal */}

        <ToastContainer />
      </div>
    </>
  );
}

export default PropertyPage;
