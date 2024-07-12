import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { order_id, amount } = location.state;

    useEffect(() => {
        const handlePayment = async () => {
            try {
                const paymentIntentResponse = await Axios.post('http://localhost:8000/create-payment-intent/', { amount });
                const clientSecret = paymentIntentResponse.data.clientSecret;

                const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: 'Customer Name',
                        },
                    },
                });

                if (paymentResult.error) {
                    alert(paymentResult.error.message);
                    navigate('/cart');
                } else {
                    if (paymentResult.paymentIntent.status === 'succeeded') {
                        await Axios.post('http://localhost:8000/update_order/', { order_id, payment: true });
                        alert('Payment successful');
                        navigate('/orders');
                    }
                }
            } catch (error) {
                console.error('Payment processing error', error);
                navigate('/cart');
            }
        };

        handlePayment();
    }, [stripe, elements, order_id, amount, navigate]);

    return (
        <div>
            <h2>Processing Payment</h2>
            <CardElement />
        </div>
    );
};

export default Payment;
