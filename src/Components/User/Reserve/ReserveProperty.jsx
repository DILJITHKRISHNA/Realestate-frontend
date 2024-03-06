import React, { useEffect, useState } from 'react'
import { FetchData, PropertyReserve } from '../../../Api/UserApi';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';

function ReserveProperty() {
    const location = useLocation();
    const propertyId = location.state.propertyId;
    const navigate = useNavigate()
    const userId = useSelector(state => state.user.userInfo.id)
    const ownerId = useSelector(state => state.user.OwnerInfo.id)
    const [open, setOpen] = useState(false)
    const [about, setAbout] = useState(false)
    const [property, setProperty] = useState([]);
    const [payment, setPayment] = useState({
        name: '',
        contact: '',
        email: '',
        interest: ''
    });
    console.log(payment, "reserve datass");
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (payment.name.trim() === '' || payment.contact.trim() === "" || payment.email.trim() === "" || payment.interest.trim() === '') {
                toast.error("All fields are required!")
            } else {

                const result = await PropertyReserve(propertyId, payment, userId, ownerId);
                console.log(result, "result in reserving property");
                if (result.data.success) {
                    toast("Property Reserved successfully!")
                    setTimeout(() => {
                        navigate('/enquiry')
                    }, 1000);
                } else {
                    toast.error("Failed to Reserve property!")
                }
            }
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

    useEffect(() => {
        const getPropertyData = async () => {
            const res = await FetchData();
            const Details = res.data.data;
            const propertyData = Details.find((item) => item._id === propertyId);
            setProperty(propertyData);
        };
        getPropertyData();
    }, [propertyId]);
    console.log(property, "properereryy");

    const handleAbout = () => {
        setAbout(!about)
    }
    return (
        <div>
            <>
                <div className='flex justify-center items-center h-screen'>
                    <div className='flex flex-col lg:flex-row w-[80%] border-2 border-black mt-16'>
                        <div className='flex flex-col justify-center w-full lg:w-full p-8'>
                            <h3 className='text-xl text-black font-mono font-semibold uppercase w-auto p-1 text-start'>Details</h3>
                            <div className='mb-6 border-b border-amber-900 w-auto'></div>
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
                                    <label>Interest</label>
                                    <input
                                        type='text'
                                        value={payment.interest}
                                        onChange={handleClick}
                                        name='interest'
                                        placeholder='Interest'
                                        className='border p-2 w-full border-amber-900'
                                    />
                                </div>
                                <div className='mt-16'>
                                    <div className='mb-4'>
                                        <button
                                            type='submit'
                                            name='interest'
                                            className='border p-2 w-full bg-amber-900 text-white font-bold'
                                        >Reserve</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className='w-full lg:w-auto p-8 mt-8'>
                            <div className='mb-6 lg:flex lg:flex-row'>
                                <img
                                    src={property.imageUrls?.[0]}
                                    alt='Property Preview'
                                    className='mt-auto lg:w-[18%] h-auto lg:h-[10%] rounded-md'
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

                            </div>
                            <div className='mb-2'>
                                <FaInfoCircle className='' onClick={handleAbout} />
                                {about ?
                                    <p className='text-gray-600'>Reserving a property means that others can also reserve the property
                                        and there is a chance that someone will beat you to the booking process.
                                        We do not recommend you to reserve the property, as it does not give you any benefits.
                                    </p>
                                    : ""}
                            </div>
                            <div className='mt-auto border-b border-amber-900 w-auto mb-2'></div>
                        </div>
                    </div>
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
                <ToastContainer />
            </>
        </div>
    )
}

export default ReserveProperty
