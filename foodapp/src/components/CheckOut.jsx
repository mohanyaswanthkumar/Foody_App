import React, { useState, useEffect } from 'react';
import './CheckOut.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51PFqqYSEv9vCwqEG9xblg02CdCXzlqsdecce3jWCEdjWrPrHibaEBdM9QYGSQF4dCM2yb3su5cDWCnPhkfjqvIFL00yyydaf2P");

const CheckOut = () => {
    const [cart, setCart] = useState(null);
    const [csum, setCsum] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        pincode: '',
        mobile: ''
    });

    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const checkGroupIn = async () => {
            const resp = await Axios.get('http://localhost:8000/viewcart/');
            setCart(resp.data.cart);
            if (resp.data.cart && resp.data.cart.length > 0) {
                let sum = resp.data.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                setCsum(sum);
            } else {
                setCsum(0);
            }
        };
        checkGroupIn();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async () => {
        const orderData = {
            username: formData.name,
            items: cart,
            amount: csum,
            address: formData.address,
            status: 'Food Processing',
            payment: false
        };

        try {
            const response = await Axios.post('http://localhost:8000/checkout/', orderData);
            alert(response.data.msg);

            // Create a PaymentIntent
            const paymentIntentResponse = await Axios.post('http://localhost:8000/create-payment-intent/', { amount: csum });
            const clientSecret = paymentIntentResponse.data.clientSecret;

            // Confirm the payment with Stripe
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: formData.name,
                    },
                },
            });

            if (paymentResult.error) {
                alert(paymentResult.error.message);
            } else {
                if (paymentResult.paymentIntent.status === 'succeeded') {
                    // Update order payment status
                    await Axios.post('http://localhost:8000/update_order/', { order_id: response.data.order_id, payment: true });
                    alert('Payment successful');
                    navigate('/orders');
                }
            }
        } catch (error) {
            console.error('There was an error submitting your order!', error);
        }
    };

    return (
        <div className='checkout'>
            <div className="delivery-details">
                <h3>Delivery Address</h3>
                <form>
                    <input type="text" name="name" id="name" placeholder='UserName' value={formData.name} onChange={handleChange} />
                    <input type="email" name="email" id="email" placeholder='Email' value={formData.email} onChange={handleChange} />
                    <input type="text" name="address" id="address" placeholder='Address' value={formData.address} onChange={handleChange} />
                    <div className='half'>
                        <input type="number" name="pincode" id="pincode" placeholder='PinCode' value={formData.pincode} onChange={handleChange} />
                        <input type="number" name="mobile" id="mobile" placeholder='Mobile' value={formData.mobile} onChange={handleChange} />
                    </div>
                </form>
            </div>
            <div className='cart-checkout'>
                <h3>Cart Totals</h3>
                <div className='checkout-items'>
                    <h5>Sub-total</h5>
                    <h5>{csum}/-</h5>
                </div>
                <hr/>
                <div className='checkout-items'>
                    <h5>Delivery Fee</h5>
                    <h5>{csum % 20}/-</h5>
                </div>
                <hr/>
                <div className='checkout-items'>
                    <h5>Total</h5>
                    <h5>{(csum) + (csum % 20)}/-</h5>
                </div>
                <hr/>
                <button style={{ backgroundColor: '#00FF00' }} onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

const PaymentPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOut />
        </Elements>
    );
};

export default PaymentPage;
