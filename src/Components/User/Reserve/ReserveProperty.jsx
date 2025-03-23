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
                const ownerId = property.ownerRef
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
            const res = await FetchData(propertyId);
            const Details = res.data.data;
            setProperty(Details);
        };
        getPropertyData();
    }, [propertyId]);
    console.log(property, "properereryy");

    const handleAbout = () => {
        setAbout(!about)
    }
    return (
        <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Form Section */}
                        <div className="w-full lg:w-1/2 p-6 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-semibold bg-amber-900 text-white py-2 px-4 rounded-md text-center mb-6">
                                DETAILS
                            </h3>
                            <div className="border-b border-amber-900 mb-6"></div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={payment.name}
                                        onChange={handleClick}
                                        placeholder="Full name"
                                        className="w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={payment.contact}
                                        onChange={handleClick}
                                        placeholder="Contact number"
                                        className="w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={payment.email}
                                        onChange={handleClick}
                                        placeholder="Email address"
                                        className="w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Level</label>
                                    <input
                                        type="text"
                                        name="interest"
                                        value={payment.interest}
                                        onChange={handleClick}
                                        placeholder="High, Medium or Low"
                                        className="w-full border border-amber-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-3 px-4 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                        Reserve Now
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Property Details Section */}
                        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-gray-50">
                            <div className="space-y-6">
                                {/* Property Preview */}
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <img
                                        src={property.imageUrls?.[0]}
                                        alt="Property Preview"
                                        className="w-full sm:w-32 h-auto rounded-lg object-cover"
                                    />
                                    <div className="flex-1 space-y-4">
                                        <p className="text-lg font-semibold">{property.name}</p>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-amber-900">Bedrooms</span>
                                                <span className="font-semibold">{property.bedrooms}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-amber-900">Bathrooms</span>
                                                <span className="font-semibold">{property.bathrooms}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-amber-900">Total Floor</span>
                                                <span className="font-semibold">{property.FloorCount}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                            <div className="flex flex-col">
                                                <span className="text-amber-900">Balcony</span>
                                                <span className="font-semibold">{property.balcony}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-amber-900">Parking</span>
                                                <span className="font-semibold">{property.parking ? "Available" : "No"}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-amber-900">Furnished</span>
                                                <span className="font-semibold">{property.furnished ? "Yes" : "No"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-amber-900 pt-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold text-amber-900">PROPERTY DETAILS</h2>
                                        <button 
                                            onClick={handleOpen}
                                            className="px-4 py-1 border-2 border-amber-900 text-amber-900 rounded-md hover:bg-amber-900 hover:text-white transition-colors duration-200"
                                        >
                                            Details
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-3 text-sm">
                                        <div className="flex flex-col">
                                            <span className="text-amber-900">Address</span>
                                            <span className="font-semibold">{property.location}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-amber-900">Country</span>
                                            <span className="font-semibold">{property.country}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-amber-900">City</span>
                                            <span className="font-semibold">{property.city}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-amber-900">State</span>
                                            <span className="font-semibold">{property.state}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-amber-900 pt-4">
                                    <button 
                                        onClick={handleAbout}
                                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                                    >
                                        <FaInfoCircle className="w-5 h-5" />
                                        <span>About Enquiry ...</span>
                                    </button>
                                    
                                    {about && (
                                        <p className="mt-2 text-sm text-gray-600 bg-gray-100 p-4 rounded-md">
                                            Reserving a property means that others can also reserve the property
                                            and there is a chance that someone will beat you to the booking process.
                                            We do not recommend you to reserve the property, as it does not give you any benefits.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className={`fixed inset-0 overflow-y-auto ${open ? "block" : "hidden"}`}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-black text-white py-3 px-4 rounded-t-lg">
                            <h3 className="text-lg font-semibold">Property Details</h3>
                        </div>

                        <div className="max-h-[42rem] overflow-y-auto p-6">
                            <img 
                                src={property.imageUrls?.[0]} 
                                alt={property.name} 
                                className="w-full rounded-lg object-cover mb-6"
                            />

                            <div className="space-y-6">
                                <div className="grid gap-4 text-sm">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Property Name</span>
                                        <span className="font-semibold">{property.name}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Property Type</span>
                                        <span className="font-semibold">{property.type}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Rent Amount</span>
                                        <span className="font-semibold">₹{property.Rent}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Location</span>
                                        <span className="font-semibold">{property.location}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Country</span>
                                        <span className="font-semibold">{property.country}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">City</span>
                                        <span className="font-semibold">{property.city}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">State</span>
                                        <span className="font-semibold">{property.state}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-amber-900">Bedrooms</div>
                                        <div className="font-semibold">{property.bedrooms}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-amber-900">Bathrooms</div>
                                        <div className="font-semibold">{property.bathrooms}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-amber-900">Total Floor</div>
                                        <div className="font-semibold">{property.FloorCount}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-amber-900">Balconies</div>
                                        <div className="font-semibold">{property.balcony}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-amber-900">Parking</div>
                                        <div className="font-semibold">{property.parking ? "Yes" : "No"}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                        <div className="text-amber-900">Furnished</div>
                                        <div className="font-semibold">{property.furnished ? "Yes" : "No"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                            <button
                                onClick={handleOpen}
                                className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default ReserveProperty;
