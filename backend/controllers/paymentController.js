import razorPay from 'razorpay';
import crypto from 'crypto';
import express from 'express';

const app = express();

// Initialize Razorpay instance
const razorpayInstance = new razorPay({
    key_id: 'rzp_test_T0NPZAPpmzk4LK',
    key_secret: '0Dp3QUF0ciwyZ5R5aRBdoOE7',
});

async function createOrder(req, res) {
    const options = {
        amount: req.body.amount * 100, // Amount in paise
        currency: 'INR',
    };
    console.log('dd')
    try {
        const order = await razorpayInstance.orders.create(options);
        return res.status(200).json(order);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating order' });
    }
}
export  default createOrder;