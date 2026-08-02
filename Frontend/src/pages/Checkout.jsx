import { useContext, useState } from "react"
import '../styles/checkout.css'
import { CartContext } from '../context/AuthContext';
import { AuthContext } from '../context/AuthContext';


import { useNavigate } from "react-router-dom"


export default function Checkout() {
    const navigate = useNavigate();

    const { cartItems } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [name, setName] = useState(user ? user.name : '');
    const [address, setAddress] = useState(user ? user.address : '');
    const [email, setEmail] = useState(user ? user.email : '');


    const totalprice = cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0);

    async function createOrder() {
        try {
            const createOrder = await fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/payments/order', {
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
            console.log('error in createOrder', error);
        }
    }

    async function openCheckout(e) {
        e.preventDefault()
        if (!user) {
            alert('Please login to proceed with checkout')
            navigate('/login')
            return
        }
        const order = await createOrder();

        console.log('Payment order has been placed', order)

        const options = {
            key: 'rzp_test_T0NPZAPpmzk4LK',
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: '',
            handler: async function (response) {
                fetch(
                    "https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/payments/verify",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(response),
                    }
                ).then(response => response.json()).then((data) => {
                    if (data.success === true) {
                        console.log(data)

                        fetch('https://humble-space-adventure-5gxpvq5qv4vpcv4jv-5000.app.github.dev/api/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': `Bearer ${user.token}`
                            },
                            body: JSON.stringify({
                                products: cartItems,
                                address: address,
                                email: email
                            })
                        }).then(response => response.json()).then((data) => {
                            navigate('/success')
                        })
                    }
                });
            },

        }

        const razorpay = new window.Razorpay(options);

        razorpay.open();
    }

    return (

        <form onSubmit={(e) => openCheckout(e)} className="checkout-form">
            <input className="checkout-input" placeholder="name" name='name' type='name' value={name} onChange={(e) => setName(e.target.value)} required />
            <input className="checkout-input" placeholder="email" name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input className="checkout-input" placeholder="Delivery address" name='address' type='address' value={address} onChange={(e) => setAddress(e.target.value)} required />
            <button className="checkout-submit">Proceed</button>
        </form>
    )
}