import express from 'express'
import {loginuser, registeruser, getUser} from '../controllers/authcontroller.js'
import protect from '../middleware/authMiddleware.js'
import admin from '../middleware/adminMiddleware.js'

const router = express.Router()

router.post('/login', loginuser)


router.post('/register', registeruser) 


router.get('/getUser',protect, admin, getUser)
 
export default router;