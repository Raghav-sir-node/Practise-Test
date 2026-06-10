import express from 'express';
import router from express.Router();

import { createOrder, verifyPayment } from '../controllers/paymentController.js';

router.post('/order', createOrder);
router.post('/verify', verifyPayment);

export default router