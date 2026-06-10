import mongoose from 'mongoose'
import orders from '../model/orders.js';
import product from '../model/product.js';
import sendEmail from '../utils/sendEmail.js';

async function createOrder(req, res) {
    console.log("create order called", req.body)
    const { products, address } = req.body;
    const userId = req.user._id;
    const email = 'raghav.king333@gmail.com';

    if (!products || !address || !totalAmount) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // calculate total Amount and price on the server side to prevent tampering
    const productIds = products.map(item => item.productId); // saving all productIds in an array to fetch their prices in one query
    let totalAmountCalculated = 0;

    try {
        const ItemPrice = await product.find({ _id: { $in: productIds } }).select('price'); // one single query to fetch prices of all products in the order
        products.forEach((item, index) => {
            totalAmountCalculated += item.quantity * ItemPrice[index].price; // calculating total amount by multiplying quantity with price of each product
            item.price = ItemPrice[index].price;
        });
    }
    catch (error) {
        return res.status(400).json({ message: `Product with ID ${item.productId} not found` });
    }

    const order = new orders({
        user: userId,
        products,
        address,
        totalAmount: totalAmountCalculated
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

async function getMyOrders(req, res) {
    try {
        const items = await orders.find({ user: req.user._id }).populate('products.productId', 'name price');
        res.status(201).json(items);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders" })
    }

}

async function getAllOrders(req, res) {
    try {
        const Orders = await orders.find({}).populate('user', 'name email').populate('products.productId', 'name price');

        res.status(201).json(Orders);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching orders" })
    }
}

async function updateOrderStatus(req, res) {

    const orderId = req.params.id;
    const { status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
    }
    else if (!status || !["pending", "shipped", "delivered"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const Order = await orders.findById(orderId);
        if (Order) {
            Order.status = status;
            await Order.save();
            res.status(200).json({ message: "Order status updated successfully" });
        }
        else {
            return res.status(404).json({ message: "Order not found" })
        }

    }
    catch (error) {
        console.error(error);
        return res.status(404).json({ message: "Server is Cold" })
    }
}

export { createOrder, getMyOrders, getAllOrders, updateOrderStatus };