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
        receipt: crypto.randomBytes(10).toString('hex'), // Generate a random receipt ID
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        return res.status(200).json(order);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error creating order' });
    }
}

async function verifyPayment(req, res) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
        .createHmac('sha256', '0Dp3QUF0ciwyZ5R5aRBdoOE7')
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    if (generatedSignature === razorpay_signature) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(400).json({ success: false, error: 'Invalid signature' });
    }
}
export { createOrder, verifyPayment };