import express from 'express'
import authentification from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import adminAnalyticsRoutes from './routes/adminAnalyticsRoutes.js'
import run from './config/db.js'
import cors from "cors";

const app = express();

app.use(cors()); 
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

run()
app.use('/api/auth', authentification)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)  
app.use('/api/payments', paymentRoutes)
app.use('/api/analytics', adminAnalyticsRoutes)

app.get("/register", (req, resp) => {
    resp.send(`
        <form method="POST" action="/api/auth/register">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <br><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <button type="submit">Submit</button>
</form>`)
})


app.listen(5000, () => {
    console.log("Server running on port 5000");
});