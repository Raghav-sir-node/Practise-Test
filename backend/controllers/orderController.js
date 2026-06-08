import mongoose from 'mongoose'
import orders from '../model/orders.js';
import sendEmail from '../utils/sendEmail.js';

async function createOrder(req, res) {
    const { products, address, totalAmount } = req.body;
    const userId = req.user._id;
    const email = req.user.email;

    if (!products || !address || !totalAmount) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    else {
        const order = new orders({
            user: userId,
            products,
            address,
            totalAmount
        });
        try {
            const savedOrder = await order.save();
            await sendEmail(email, "Order Placed", `Dear ${req.user.name},
Thank you for your order!
We're delighted to have you as our customer. Your order has been received and is now being processed.
We'll notify you once your order has been shiIpped.
Thank you for shopping with us!` );
            res.status(201).json(savedOrder);

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

function getMyOrders(req, res) { 
    const items = orders.find({ user: req.user._id }).populate('items.product', 'name price');
    
}

function getAllOrders(req, res) { }

function updateOrderStatus(req, res) { }

export { createOrder, getMyOrders, getAllOrders, updateOrderStatus };