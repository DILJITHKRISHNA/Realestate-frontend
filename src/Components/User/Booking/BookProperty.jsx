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
                <label>Re-Location</label>
                <input
                  type='date'
                  value={payment.relocationDate}
                  onChange={handleClick}
                  name='relocationDate'
                  min={currentDate.toISOString().split('T')[0]}
                  className='border p-2 w-full border-amber-900'
                />
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
                src={property.imageUrls?.[0]}
                alt='Property Preview'
                className='mt-auto lg:w-[8%] h-auto lg:h-[10%] rounded-md'
              />
              <div className="lg:ml-10 flex flex-col">
                <p className='text-md font-mono'>Name: {property.name}</p>
                <div className='mt-auto border-b border-amber-900 w-auto'></div>
                <div className='flex flex-row gap-10'>
                  <h1 className='text-md font-mono text-amber-900'>Bedroom:0<span className='text-black font-semibold'>{property.bedrooms}</span></h1>
                  <h1 className='text-md font-mono text-amber-900'>Bathroom:0<span className='text-black font-semibold'>{property.bathrooms}</span></h1>
                  <h1 className='text-md font-mono text-amber-900'>Total Floor:0<span className='text-black font-semibold'>{property.FloorCount}</span></h1>
                </div>

                <div className='mt-2 border-b border-amber-900 w-auto '></div>
                <div className='flex flex-row gap-10'>
                  <h1 className='text-md font-mono text-amber-900'>balcony:0<span className='text-black font-semibold'>{property.balcony}</span></h1>
                  <h1 className='text-md font-mono text-amber-900'>Parking:<span className='text-black font-semibold'>{property.parking === true ? "Available" : "No"}</span></h1>
                  <h1 className='text-md font-mono text-amber-900'>Furnished:<span className='text-black font-semibold'>{property.furnished === true ? "Yes" : "No"}</span></h1>
                </div>
              </div>
            </div>
            <div className='border-b border-amber-900 w-auto'></div>
            <div className='ml6 mt-10 mb-12'>
              <div className='flex flex-row justify-between'>
                <h1 className='text-2xl font-semibold font-mono mb-2 text-amber-900 uppercase'>Property Details</h1>
                <button onClick={handleOpen} className='mr-10 border-2 border-amber-900 text-amber-900 rounded-lg px-1 mt-1 hover:bg-amber-900 hover:text-white font-semibold'>Details</button>
              </div>
              <ul className='list-disc pl-3 space-y-4'>
                <li className='mb-2 text-amber-900 font-mono'>Address: <span className='text-black font-semibold'>{property.location}</span></li>
                <li className='mb-2 text-amber-900 font-mono'>Country: <span className='text-black font-semibold'>{property.country}</span></li>
                <li className='mb-2 text-amber-900 font-mono'>City: <span className='text-black font-semibold'>{property.city}</span></li>
                <li className='mb-2 text-amber-900 font-mono'>State: <span className='text-black font-semibold'>{property.state}</span></li>
              </ul>
              <div className='flex flex-row items-center mt-8 gap-2' onClick={handleWallet}>
                <FaInfoCircle className='' />
                <p className='font-extralight'>Pay through wallet</p>
              </div>
              {walletOpen ?
                <div className='flex flex-row gap-4 mt-2'>
                  <h1 className='font-bold'>Your wallet: <span className='text-amber-900'>₹{user.wallet}</span></h1>
                  <button onClick={() => handlePaymentWallet(payment.name, payment.contact, payment.email, payment.relocationDate)} className='border-2 border-black px-4 rounded-md hover:bg-black hover:text-white'>Pay Now</button>
                </div>
                : ""}
            </div>
            <div className='mt-auto border-b border-amber-900 w-auto mb-5'></div>
            { clientSecret ? (
              <div onClick={handleSubmit}
                className='mb-20 w-auto border-2 border-gray-200 bg-black flex flex-row hover:bg-black'
                style={{ cursor: 'pointer' }}
              >
                <FaStripe className=" ml-[40%] text-white" style={{ width: '30px', height: '39px' }} />
                <Elements stripe={StripePromise} options={options}>
                  <Payment setCount={setCount} name={payment.name} Rent={rent} contact={payment.contact} email={payment.contact} re_location={payment.relocationDate} propertyId={propertyId} clientSecret={clientSecret} />
                </Elements>
              </div>
            ) : ""}
          </div>
        </div>
        <ToastContainer />
      </div>

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

  )
}

export default BookProperty
