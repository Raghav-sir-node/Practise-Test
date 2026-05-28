import express from 'express'
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct} from '../controllers/productcontroller.js'

const router = express.Router()
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)

export default router;