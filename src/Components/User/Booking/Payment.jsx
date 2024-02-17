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
            console.log(paymentIntent, "hiii");

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
            <Button onClick={handleOpen}>Connect Wallet</Button>
            <Dialog size="xs" open={open} handler={handleOpen} style={{ maxWidth: '30rem' }}>
                <DialogHeader className="justify-between">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="flex flex-row gap-4">
                            Make Your Payment
                            <img
                                src="https://docs.material-tailwind.com/icons/metamask.svg"
                                alt="metamast"
                                className="h-6 w-6 rounded-md"
                            />
                        </Typography>
                        <Typography color="gray" variant="paragraph">
                            Choose which card you want to connect
                        </Typography>
                    </div>

                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
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
                    </IconButton>
                </DialogHeader>
                <div className="flex justify-around">
                    <Typography color="gray" variant="paragraph" className="mr-60 font-bold">
                        Rent Amount
                    </Typography>
                    <span className="font-bold">₹ 30000</span>
                </div>
                <div className="border-b-2 border-gray-300 w-[92%] ml-5"></div>
                <DialogBody className="overflow-y-scroll !px-5">
                    <div className="mb-6">
                        <Typography
                            variant="paragraph"
                            color="blue-gray"
                            className="py-3 font-semibold uppercase opacity-70"
                        >
                        </Typography>
                        <form onSubmit={handleSubmit}>

                            <Card className="flex justify-between mb-4 flex-col">
                                <div className=" text-gray-300">
                                    <label>
                                        <PaymentElement />
                                    </label>
                                </div>
                            </Card>
                            <div className="mt-12 w-full flex justify-center">
                                <Button variant="outlined" size="sm" type="submit" className="bg-blue-500 hover:bg- text-white p-2 rounded w-[70%] ">
                                    Pay
                                </Button>
                            </div>

                        </form>
                    </div>
                    <div>
                        <ul className="mt-4 -ml-2.5 flex flex-col gap-1">
                        </ul>
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-center items-center gap-2">
                    <div className="flex items-center">
                        <FaStripe className="w-8 h-8 mt-1" />
                    </div>
                    <div className="">
                        Payments Are Secured And Encrypted
                    </div>
                </DialogFooter>

            </Dialog>
        </>
    );
}

export default Payment