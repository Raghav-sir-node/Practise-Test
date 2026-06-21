import order from '../model/orders.js'
import product from '../model/product.js'
import user from '../model/User.js'

export const getAnalytics = async (req, res) => {
    try{
        const totalOrders = await order.countDocuments({role: 'user'});
        const totalProducts = await product.countDocuments();
        const totalUsers = await user.countDocuments();
        const orders = await order.find({});
        console.log(orders)
        const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);

        console.log("in analytics")
        res.status(200).json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalRevenue
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'analytics Server error' })
    }
}