import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
    Card,
} from "@material-tailwind/react";
import { Elements, PaymentElement, LinkAuthenticationElement, useStripe, useElements, CardElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FaStripe } from "react-icons/fa";

function Payment({ clientSecret, name, contact, email, re_location }) {

    const stripe = useStripe();
    const elements = useElements();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.error('Stripe or Elements not initialized.');
            return;
        }

        try {
            console.log(clientSecret, "secrettt");
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                },
                redirect: "if_required"
            })
            if (paymentIntent) {
                let bookData = {
                    name: name,
                    paymentstatus: "success",
                    contact: contact,
                    re_location: re_location,
                    email: email
                }
            }
            console.log(paymentIntent, "payment intent");

            if (error) {
                console.error(error.message);
            } else {
                console.log('Payment successful:', paymentIntent);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>Pay Now</Button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
                        <div className="flex justify-between">
                            <div className="">
                                <h5 className="text-blue-gray text-xl font-semibold">
                                    Make Your Payment
                                </h5>
                                <p className="text-gray text-sm">
                                    Choose which card you want to connect
                                </p>
                            </div>

                            <button
                                className="text-blue-gray focus:outline-none  mt-2"
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
                        <div className="mt-6 flex flex-row justify-around space-x-72">
                            <h1 className="flex">RentAmount</h1>
                            <span>$3000</span>
                        </div>
                        <div className="border-b-2 border-gray-400"></div>
                        <div className="mt-12">
                            <PaymentElement />
                        </div>
                        <div className="w-auto flex justify-center mt-5" onClick={handleSubmit}>
                            <button className="bg-blue-500 w-44 text-white font-semibold rounded-md">PAY</button>
                        </div>
                        <div className="w-full flex justify-center mt-10 gap-2">
                            <FaStripe className="w-6 h-7" />
                            <h1>Payments are secure and encrypted</h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Payment