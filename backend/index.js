import express from 'express'
import authentification from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import adminAnalyticsRoutes from './routes/adminAnalyticsRoutes.js'
import run from './config/db.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connecting with mongodb
run()

app.use('/api/auth', authentification)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)  
app.use('/api/payments', paymentRoutes)
app.use('/api/analytics', adminAnalyticsRoutes)

app.get("/login", (req, resp) => {
    resp.send(`
        <form method="POST" action="/api/auth/login">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <br><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Submit</button>
</form>`)
})


app.listen(3000)
