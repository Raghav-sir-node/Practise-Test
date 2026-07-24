import { useEffect, useState } from "react"

export default function Checkout() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    const products = storedCartItems.map((item) => {
        return {
            productId: item._id,
            quantity: item.quantity
        }
    })

    async function sendingOrder() {
        const response = await fetch('https://literate-space-engine-xrw6446qv9v92v9g9-5000.app.github.dev/api/orders', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNjNhZjk0Y2I4ZDNiYTlmYWRhNzQ1ZiIsImlhdCI6MTc4NDkxNzkxMSwiZXhwIjoxNzg1NTIyNzExfQ.BrFh9Pj8azEpWWfHgmvpMon19cuY_bVat_FeS8Uo7Ds'
            },
            body: JSON.stringify({
                products,
                address,
                 email
            })
        })
        let data = await response
        console.log(data)
        console.log(name)

    }

    return (
        <div>
            <div className="">
                <input placeholder="Enter Your Name" type="name" onChange={(e) => setName(e.target.value)} />
                <input placeholder="Enter Your Address" type="address" onChange={(e) => setAddress(e.target.value)} />
                <input placeholder="Enter Your email" type="email" onChange={(e) => setEmail(e.target.value)} />
                <button onClick={()=>sendingOrder()}>Proceed</button>
            </div>

        </div>
    )

}