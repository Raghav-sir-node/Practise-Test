import express from 'express';
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'
import { getAnalytics } from '../controllers/adminAnalyticsController.js'

const router = express.Router();

router.get('/', protect, admin, getAnalytics);

export default router;