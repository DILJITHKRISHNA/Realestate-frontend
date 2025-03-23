import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux"
import { FaStripe, FaCreditCard } from "react-icons/fa";
import { SuccessRequest } from "../../../Api/UserApi";
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

function Payment({ clientSecret, name, contact, email, re_location, propertyId, Rent, setCount }) {

    const selector = useSelector(state => state.user.userInfo.id)
    const ownerId = useSelector(state => state.owner.OwnerInfo.id)
    console.log(selector, "userIddd");
    const navigate = useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !contact || !email || !re_location) {
            toast.error("All fields are required", {
                style: {
                    marginTop: "4rem"
                }
            });
            return;
        }
        const currentDate = new Date();
        const selectedDate = new Date(re_location);
        if (selectedDate <= currentDate) {
            toast.error("Relocation date should be after today's date", {
                style: {
                    marginTop: "4rem"
                }
            });
            return;
        }

        if (!stripe || !elements) {
            console.error('Stripe or Elements not initialized.');
            return;
        }

        try {
            console.log(clientSecret, "secrettt");
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {},
                redirect: "if_required"
            })
            if (paymentIntent) {
                let bookData = {
                    name: name,
                    paymentstatus: "success",
                    contact: contact,
                    Rent: Rent,
                    re_location: re_location,
                    email: email
                }
                console.log(bookData, "booked data");
                const response = await SuccessRequest(bookData, propertyId, selector, ownerId)
                console.log(response, "response when it is sucecss");
                if (response.data.success) {
                    toast.success("Property Booked Successfully", {
                        position: "top-right",
                        autoClose: 2000,
                        style: {
                            marginTop: "50px",
                        },

                    })

                    setTimeout(() => {
                        navigate('/success')
                    }, 2000);
                } else {
                    toast.error("please add the required fields..",{
                        position: "top-right",
                        autoClose: 2000,
                        style: {
                            marginTop: "50px",
                        },
                    })
                }
            }

            if (error) {
                console.error(error);
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 2000,
                    style: {
                        marginTop: "50px",
                    },})
            } else {
                console.log('Payment successful:', paymentIntent);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Button 
                onClick={handleOpen} 
                className="w-full px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
                <FaCreditCard className="w-5 h-5" />
                Pay with Card
            </Button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-md mx-auto">
                        <div className="p-4 sm:p-6">
                            {/* Header */}
                            <div className="flex justify-between items-start">
                                <div className="pr-8">
                                    <h5 className="text-lg sm:text-xl font-semibold text-gray-900">
                                        Make Your Payment
                                    </h5>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Choose which card you want to connect
                                    </p>
                                </div>
                                <button
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                    onClick={handleOpen}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Rent Amount */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-md">
                                    <h1 className="text-sm sm:text-base font-medium">Rent Amount</h1>
                                    <span className="text-sm sm:text-base font-semibold">₹{Rent}</span>
                                </div>
                            </div>

                            {/* Payment Element */}
                            <div className="mt-8">
                                <PaymentElement />
                            </div>

                            {/* Pay Button */}
                            <div className="mt-8">
                                <button 
                                    onClick={handleSubmit}
                                    className="w-full bg-black text-white py-3 px-4 rounded-md font-semibold text-sm sm:text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FaCreditCard className="w-5 h-5" />
                                    PAY NOW
                                </button>
                            </div>

                            {/* Secure Payment Note */}
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <FaStripe className="w-5 h-6 sm:w-6 sm:h-7 text-gray-600" />
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Payments are secure and encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            )}
        </>
    );
}

export default Payment