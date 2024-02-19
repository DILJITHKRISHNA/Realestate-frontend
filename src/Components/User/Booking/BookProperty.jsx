import React, { useEffect, useState } from 'react';
import { FaStripe } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BookingData, FetchData, paymentRequest } from '../../../Api/UserApi';
import Payment from './Payment.jsx';

// let StripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
let StripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
console.log(StripePromise, "pkk");

function BookProperty() {
  const location = useLocation();
  const propertyId = location.state?.propertyId;
  const [clientSecret, setClientSecret] = useState("");

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
        } catch (error) {
          console.error("Error while making the request:", error);
        }
      };
      fetchPaymentIntent();
    }
  }, [propertyId]);

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
      const res = await FetchData();
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

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex flex-col lg:flex-row w-[80%] border-2 border-black mt-16'>
        <div className='flex flex-col justify-center w-full lg:w-full p-8'>
          <h3 className='text-xl mb-8 text-white font-mono font-semibold uppercase w-auto bg-amber-900 p-1 text-center'>Details</h3>


          <form onSubmit={handleSubmit}>

            <div className='mb-auto'>
              <label >Name</label>
              <input
                type='text'
                name='name'
                value={payment.name}
                onChange={handleClick}
                placeholder='Fullname'
                className='border p-2 w-full border-amber-900 ' />
            </div>
            <div className='mb-4'>
              <label >Contact</label>
              <input type='text'
                value={payment.contact}
                onChange={handleClick}
                name='contact'
                placeholder='Contact'
                className='border p-2 w-full border-amber-900' />
            </div>

            <div className='mb-4'>
              <label >Email</label>
              <input
                type='email'
                name='email'
                value={payment.email}
                onChange={handleClick}
                placeholder='Email'
                className='border p-2 w-full border-amber-900' />
            </div>
            <div className='mb-4'>
              <label >Re-Location</label>
              <input
                type='date'
                value={payment.relocationDate}
                onChange={handleClick}
                name='relocationDate'
                className='border p-2 w-full border-amber-900' />
            </div>
            <h3 className='text-xl mb-auto text-amber-900 font-mono font-semibold uppercase'>Payment Type </h3>


            <div className="">
              <div className=" w-auto border-2 border-gray-200 bg-black flex flex-row">
                <FaStripe className="ml-[40%] text-white" style={{ width: '50px', height: '40px' }} />
              </div>
            </div>
          </form>
        </div>

        <div className='w-full lg:w-auto p-8 mt-8'>
          <div className='mb-6 lg:flex lg:flex-row'>
            <img
              src={property.imageUrls}
              alt='Property Preview'
              className='mt-auto lg:w-[8%] h-auto lg:h-[10%] rounded-md'
            />
            <div className="lg:ml-10 flex flex-col">
              <p className='text-md font-mono'>Name: {property.name}</p>
              <div className='mt-auto border-b border-amber-900 w-auto '></div>
              <div className='flex flex-row gap-10'>
                <h1 className='text-md font-mono text-amber-900'>Bedroom: 0<span className='text-black font-semibold'>{property.bedrooms}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Bathroom: 0<span className='text-black font-semibold'>{property.bathrooms}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Total Floor: 0<span className='text-black font-semibold'>{property.FloorCount}</span></h1>
              </div>
              <div className='mt-2 border-b border-amber-900 w-auto '></div>
              <div className='flex flex-row gap-10'>
                <h1 className='text-md font-mono text-amber-900'>balcony: 0<span className='text-black font-semibold'>{property.balcony}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Parking: <span className='text-black font-semibold'>{property.parking === true ? "Available" : "No"}</span></h1>
                <h1 className='text-md font-mono text-amber-900'>Furnished: <span className='text-black font-semibold'>{property.furnished === true ? "Yes" : "No"}</span></h1>
              </div>
            </div>
          </div>
          <div className='border-b border-amber-900 w-auto'></div>
          <div className='ml6 mt-10 mb-12'>
            <h1 className='text-2xl font-semibold font-mono mb-2 text-amber-900 uppercase'>Property Details</h1>
            <ul className='list-disc pl-6 space-y-4'>
              <li className='mb-2 text-amber-900 font-mono'>Address: <span className='text-black font-semibold'>{property.location}</span></li>
              <li className='mb-2 text-amber-900 font-mono'>Country: <span className='text-black font-semibold'>{property.country}</span></li>
              <li className='mb-2 text-amber-900 font-mono'>City: <span className='text-black font-semibold'>{property.city}</span></li>
              <li className='mb-2 text-amber-900 font-mono'>State: <span className='text-black font-semibold'>{property.state}</span></li>
            </ul>
          </div>
          <div className='mt-auto border-b border-amber-900 w-auto mb-10'></div>
          {clientSecret ? (
            <div onClick={handleSubmit}
              className='mb-12 w-auto border-2 border-gray-200 bg-black flex flex-row hover:bg-black'
              style={{ cursor: 'pointer' }}
            >
              <FaStripe className=" ml-[40%] text-white" style={{ width: '30px', height: '39px' }} />
              <Elements stripe={StripePromise} options={options}>
                <Payment name={payment.name} contact={payment.contact} email={payment.contact} re_location={payment.relocationDate} propertyId={propertyId} clientSecret={clientSecret} />
              </Elements>
            </div>
          ) : ""}
        </div>
      </div>
    </div>

  )
}
{/* <button type='submit' className='text-white mt-1 ml-2 text-lg font-bold hover:text-amber-200' onClick={handleSubmit}>
              Pay Now
            </button> */}

export default BookProperty
