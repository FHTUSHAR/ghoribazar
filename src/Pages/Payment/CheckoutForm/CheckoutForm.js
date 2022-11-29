import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { price, email, _id, name, title } = booking



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://resell-goods-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
                console.log(data)
            });
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error)
            setCardError(error.message)
        } else {
            setCardError('')

        }

        setSuccess('')
        const { paymentIntent, error: consfirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name,
                        email,
                    },
                },
            },
        );

        if (consfirmError) {
            setCardError(consfirmError.message)
            return
        }
        if (paymentIntent.status === 'succeeded') {
            setSuccess('Congratulation ! your payment has been successful')
            setTransactionId(paymentIntent.id)
            const payment = {
                price,
                name,
                transactionId: paymentIntent.id,
                email,
                bookingId: _id
            }
            fetch('https://resell-goods-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',

                },
                body: JSON.stringify(payment),
            })
                .then(res => res.json())
                .then(data => {
                    setSuccess('Congratulation ! your payment has been successful')
                    setTransactionId(paymentIntent.id)
                })
            console.log(paymentIntent)
        }
        setProcessing(true)
    }
    return (
        <div className='ml-5'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary mt-5 px-6 py-0 btn-sm' type="submit" disabled={!stripe || !clientSecret}>
                    <span className=''>Pay</span>
                </button>
            </form>
            <p className='text-red-500'>{cardError}</p>
            {
                success && <div>
                    <p className='text-green-400'>{success}</p>
                    <p>Your transaction Id:<span className='font-bold'> {transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;