import React, { useEffect, useState } from 'react';
import { FaInfoCircle, FaStripe, FaWallet } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BookingData, FetchProfileData, FetchPropertyData, paymentRequest, walletPayment } from '../../../Api/UserApi';
import Payment from './Payment.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

// let StripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
let StripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
console.log(StripePromise, "pkk");

function BookProperty() {

  const selector = useSelector(state => state.user.userInfo)
  const ownerId = useSelector(state => state.owner.OwnerInfo.id)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const location = useLocation();
  const propertyId = location.state?.propertyId;
  const [clientSecret, setClientSecret] = useState("");
  const [rent, setRent] = useState();
  const [count, setCount] = useState(1);
  const [payRent, setPayRent] = useState(false);
  const [user, setUser] = useState();
  const [payment, setPayment] = useState({
    name: '',
    contact: '',
    email: '',
    relocationDate: ''
  });

  useEffect(() => { 
    if (propertyId) {
      const fetchPaymentIntent = async () => {
        try {
          const res = await paymentRequest(propertyId);
          console.log(res, "Response in payment requestttt");
          setClientSecret(res.data.clientSecret);
          setRent(res.data.RentAmount)
        } catch (error) {
          console.error("Error while making the request:", error);
        }
      };
      fetchPaymentIntent();
    }
  }, [propertyId]);

  console.log(rent, "ttttt");

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.error(error);
    }
  };
  const currentDate = new Date();

  const handleClick = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value
    });
  };
  console.log(payment, "typing dataaa");

  const [property, setProperty] = useState([]);

  useEffect(() => {
    const getPropertyData = async () => {
      const res = await FetchPropertyData();
      const Details = res.data.data;
      const date = Details[0].createdAt;
      const dateObject = new Date(date);

      console.log(dateObject, "datee");
      const propertyData = Details.find((item) => item._id === propertyId);
      console.log(propertyData, "got propertyyy dataaaaa");

      setProperty(propertyData);
    };
    getPropertyData();
  }, [propertyId]);

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleWallet = () => {
    setWalletOpen(!walletOpen)
  }

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const res = await FetchProfileData(selector.id)
        if (res.data.success) {
          setUser(res.data.userData)
        }
      } catch (error) {
        console.log(error);
      }
    }
    ProfileData()
  }, [])

  const handlePaymentWallet = async (name, contact, email, re_locationDate) => {
    try {
      if (contact === "" || email === "" || name === "" || re_locationDate === "") {
        toast.error("Please fill all fields")
      } else {
        const res = await walletPayment(propertyId, selector.id, name, contact, email, re_locationDate, ownerId)
        console.log(res, "ress in handlepayment wallet");
        if (res.data.success) {

          toast("Payment successfull through wallet!")
          setTimeout(() => {
            navigate('/success')
          }, 2000);
        } else {
          console.log(res.data, "wallettt in frontt");
          const userWallet = res.data.userList.wallet
          const PropertyRent = res.data.propertyList.Rent
          if (userWallet <= PropertyRent) {
            toast.error("Wallet balance is not enough to buy this!")
          } else {
            toast.error("Error occured while processing your request.")
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePayRent = () => {
    setPayRent(!payRent)
    // walletOpen(false)
  }

  return (
    <>
      <div className='min-h-screen py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='flex flex-col lg:flex-row'>
              {/* Form Section */}
              <div className='w-full lg:w-1/2 p-6 sm:p-8'>
                <h3 className='text-lg sm:text-xl font-semibold bg-amber-900 text-white py-2 px-4 rounded-md text-center mb-6'>
                  DETAILS
                </h3>

                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                    <input
                      type='text'
                      name='name'
                      value={payment.name}
                      onChange={handleClick}
                      placeholder='Full name'
                      className='w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Contact</label>
                    <input
                      type='text'
                      name='contact'
                      value={payment.contact}
                      onChange={handleClick}
                      placeholder='Contact number'
                      className='w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={payment.email}
                      onChange={handleClick}
                      placeholder='Email address'
                      className='w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Re-Location Date</label>
                    <input
                      type='date'
                      name='relocationDate'
                      value={payment.relocationDate}
                      onChange={handleClick}
                      min={currentDate.toISOString().split('T')[0]}
                      className='w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                    />
                  </div>

                  <div className='pt-4'>
                    <h3 className='text-lg font-semibold text-amber-900 mb-4'>PAYMENT TYPE</h3>
                    <div className='bg-black p-4 rounded-md flex justify-center items-center'>
                      <FaStripe className='text-white w-12 h-8' />
                    </div>
                  </div>
                </form>
              </div>

              {/* Property Details Section */}
              <div className='w-full lg:w-1/2 p-6 sm:p-8 bg-gray-50'>
                <div className='space-y-6'>
                  {/* Property Preview */}
                  <div className='flex flex-col sm:flex-row items-start gap-4'>
                    <img
                      src={property.imageUrls?.[0]}
                      alt='Property Preview'
                      className='w-full sm:w-32 h-auto rounded-lg object-cover'
                    />
                    <div className='flex-1 space-y-4'>
                      <p className='text-lg font-semibold'>{property.name}</p>
                      
                      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                        <div className='flex flex-col'>
                          <span className='text-amber-900'>Bedrooms</span>
                          <span className='font-semibold'>{property.bedrooms}</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-amber-900'>Bathrooms</span>
                          <span className='font-semibold'>{property.bathrooms}</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-amber-900'>Total Floor</span>
                          <span className='font-semibold'>{property.FloorCount}</span>
                        </div>
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                        <div className='flex flex-col'>
                          <span className='text-amber-900'>Balcony</span>
                          <span className='font-semibold'>{property.balcony}</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-amber-900'>Parking</span>
                          <span className='font-semibold'>{property.parking ? "Available" : "No"}</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-amber-900'>Furnished</span>
                          <span className='font-semibold'>{property.furnished ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='border-t border-amber-900 pt-6'>
                    <div className='flex justify-between items-center mb-4'>
                      <h2 className='text-xl font-semibold text-amber-900'>PROPERTY DETAILS</h2>
                      <button 
                        onClick={handleOpen}
                        className='px-4 py-1 border-2 border-amber-900 text-amber-900 rounded-md hover:bg-amber-900 hover:text-white transition-colors duration-200'
                      >
                        Details
                      </button>
                    </div>
                    
                    <div className='space-y-3 text-sm'>
                      <div className='flex flex-col'>
                        <span className='text-amber-900'>Address</span>
                        <span className='font-semibold'>{property.location}</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-amber-900'>Country</span>
                        <span className='font-semibold'>{property.country}</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-amber-900'>City</span>
                        <span className='font-semibold'>{property.city}</span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-amber-900'>State</span>
                        <span className='font-semibold'>{property.state}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Now Button Section */}
            <div className='p-6 bg-gray-50 border-t border-gray-200'>
              <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4'>
                <div className='flex items-center gap-2 text-gray-600 cursor-pointer' onClick={handleWallet}>
                  <FaWallet className='w-5 h-5' />
                  <span className='text-sm'>Pay through wallet</span>
                  {user && <span className='text-amber-900 font-semibold'>(₹{user.wallet})</span>}
                </div>

                {walletOpen && (
                  <div className='flex items-center gap-4'>
                    <button 
                      onClick={() => handlePaymentWallet(payment.name, payment.contact, payment.email, payment.relocationDate)}
                      className='w-48 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2'
                    >
                      <FaWallet className='w-5 h-5' />
                      Pay with Wallet
                    </button>
                  </div>
                )}

                {clientSecret && (
                  <div className='flex-shrink-0'>
                    <Elements stripe={StripePromise} options={options}>
                      <div className='w-48 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'>
                        <Payment 
                          setCount={setCount} 
                          name={payment.name} 
                          Rent={rent} 
                          contact={payment.contact} 
                          email={payment.email} 
                          re_location={payment.relocationDate} 
                          propertyId={propertyId} 
                          clientSecret={clientSecret} 
                        />
                      </div>
                    </Elements>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />

      {/* modal */}
      <div
        className={`fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}
      >

        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-lime-400 text-white py-2 uppercase font-semibod font-mono px-4 rounded-t">
              Property Details
            </div>
            <div className="h-[42rem] overflow-scroll p-4">
              <img src={property.imageUrls?.[0]} alt="" className="rounded-md" />
              <div className="p-4 font-semibold font-mono text-black space-y-10">
                <h1 className="text-lg">Property Name: <span className="text-amber-900 font-semibold">{property.name}</span></h1>
                <h1>Property Details: <span className="text-amber-900 font-semibold">{property.details}</span></h1>
                <h1>Rent Amount: <span className="text-amber-900 font-semibold">{property.Rent}</span></h1>
                <h1>Property Type: <span className="text-amber-900 font-semibold">{property.type}</span></h1>
                <h1>Location: <span className="text-amber-900 font-semibold">{property.location}</span></h1>
                <h1>Country: <span className="text-amber-900 font-semibold">{property.country}</span></h1>
                <h1>City: <span className="text-amber-900 font-semibold">{property.city}</span></h1>
                <h1>State: <span className="text-amber-900 font-semibold">{property.state}</span></h1>
              </div>
              <div className="">
                <div className='border-b-2 border-black w-82 mt-1'></div>

                <div className='flex flex-row gap-14 justify-around'>
                  <h1 className='text-amber-900'>Bedroom: <span className='font-semibold text-black'> 0{property.bedrooms}</span></h1>
                  <h1 className='text-amber-900'>Bathroom: <span className='font-semibold text-black '> 0{property.bathrooms}</span></h1>
                  <h1 className='text-amber-900'>Total Floor: <span className='font-semibold text-black'> 0{property.FloorCount}</span></h1>
                </div>
                <div className='border-b-2 border-black w-82 mt-4'></div>
                <div className='flex flex-row gap-5 mt-2 justify-around'>
                  <h1 className='text-amber-900'>Balconies: <span className='font-semibold text-black'> 0{property.balcony}</span></h1>
                  <h1 className='text-amber-900'>Parking: <span className='font-semibold text-black'> {property.parking ? "Yes" : "No"}</span></h1>
                  <h1 className='text-amber-900 '>Furnished: <span className='font-semibold text-black'> {property.furnished ? "Furnished" : "No"}</span></h1>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 py-2 px-4 bg-gray-100 rounded-b justify-center">
              <button
                onClick={handleOpen}
                className="text-amber-900 border-2 border-amber-900 hover:bg-amber-900 hover:text-white px-4 py-1 rounded-md "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
    </>
  );
}

export default BookProperty;
