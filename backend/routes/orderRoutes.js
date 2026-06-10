import protect from '../middleware/authMiddleware.js';
import admin from '../middleware/adminMiddleware.js';
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import express from'express';
const router = express.Router();    

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders)  // user can order and admin can see all orders
router.route('/getMyOrders').get(protect, getMyOrders); // user can see their own orders
router.route('/:id/status').put(protect, admin, updateOrderStatus) // admin can update order status

export default router;