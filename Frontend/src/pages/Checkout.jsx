import { useContext } from "react"
import '../styles/checkout.css'
import { CartContext } from '../context/AuthContext';

import { useNavigate } from "react-router-dom"


export default function Checkout() {
    const { cartItems } = useContext(CartContext);
    const totalprice = cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0);

    async function createOrder() {
        try {
            const createOrder = await fetch('https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/payments/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: totalprice })
            })

            let response = await createOrder.json()
            return response
        }
        catch (error) {
            console.log('error in checkout.jsx', error);
        }
    }

    async function openCheckout() {
        const order = await createOrder();

        const options = {
            key: 'rzp_test_T0NPZAPpmzk4LK',
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: 'chut',
            handler: async function (response) {
                fetch(
                    "https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/payments/verify",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(response),
                    }
                ).then(response=>response.json()).then(data=>console.log(data));
            },

        }

        const razorpay = new window.Razorpay(options);

        razorpay.open();
    }

    return (
        <button onClick={() => openCheckout()}>
            Pay ₹500
        </button>
    )
}