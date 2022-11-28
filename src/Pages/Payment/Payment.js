import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm/CheckoutForm';



const stripePromise = loadStripe(process.env.REACT_APP_stripeKey);
const Payment = () => {
    const booking = useLoaderData()
    console.log(booking)
    return (
        <div className=' h-96'>

            <h1 className='text-xl text-white ml-5'>Please pay ${booking.price} for your order</h1>
            <div className='w-96 my-12 border-red-600'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;