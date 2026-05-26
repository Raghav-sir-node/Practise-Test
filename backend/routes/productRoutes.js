import express from 'express'
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'
import { createproduct, deleteproduct, getproductbyid, getproducts, updateproduct } from '../controllers/productcontroller.js'

const router = express.Router()
router.route('/').get(getproducts).post(protect, admin, createproduct);
router.route('/:id').get(getproductbyid).put(protect, admin, updateproduct).delete(protect, admin, deleteproduct)

export default router;