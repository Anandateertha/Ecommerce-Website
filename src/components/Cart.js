import React, { useContext, useEffect, useState } from 'react'
import productContext from '../context/products/ProductContext'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import ReactGA from "react-ga4";

const Cart = () => {

    const context = useContext(productContext)
    const { itemsinthecart, cartitems,orderingfromcart,alertfromlogin } = context
    const [totalprice, settotalprice] = useState(null)
    const navigate=useNavigate()
    const host = 'http://localhost:5000'

    useEffect(() => {
        itemsinthecart()
        document.title=`Hemadri's - Your Cart`
    }, [])

    useEffect(() => {
        const totalPrice = cartitems.reduce((acc, cartitem) => acc + cartitem.price, 0);
        settotalprice(totalPrice);
    }, [cartitems]);

    const handleRazorpayOpen = (order, user) => {
        const options = {
            key: process.env.REACT_APP_KEY,
            amount: totalprice,
            currency: "INR",
            name: "Hemadri's",
            description: "It is a ecommerce website from where you can order your favourite snack and get delivered to your door step!",
            order_id: order.id,
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone
            },
            notes: {
                address: "Hemadri's at Bellari"
            },
            handler: async function (response) {
                console.log(response)
                try {
                    const responses = await fetch(`${host}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'order_id': response.razorpay_order_id,
                            'razorpay_payment_id': response.razorpay_payment_id,
                            'razorpay_signature': response.razorpay_signature
                        }
                    })
                    const json = await responses.json()
                    if (json.success) {
                        orderingfromcart()
                        alertfromlogin("Payment Successfull and your order for items in the cart is placed ","success")
                        ReactGA.event({
                            category: 'Cart',
                            action: "Ordered Successfully from the Cart",
                            label: "Clicked on Order now for payment"
                        });
                        navigate('/')
                    }
                    else {
                        alertfromlogin("Payment Failed ","danger")
                    }
                } catch (error) {
                    alertfromlogin("Error during payment verification, Try again","danger")
                }


            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handlebuyfromCart=async ()=>{
        try {
            const response = await fetch(`${host}/api/payment/payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ totalprice })
            });

            const json = await response.json();

            if (json.success) {
                handleRazorpayOpen(json.order, json.user);
            } else {
                // console.log('Failed to initiate payment');
                alertfromlogin("Error during intialting a payment, Please try again","danger")
            }
        } catch (error) {
            // console.error('Error during payment initiation:', error);
            alertfromlogin("Error during payment initiation, Please Try again","danger")
            navigate(`/cart`);
        }
        
    }

    return (
        <div className='container row mx-auto font text-center' >
            <h2 style={{ marginTop: '65px', position: 'sticky' }}>Cart Items<p>Grand Total :Rs {totalprice}</p></h2>
            <button onClick={handlebuyfromCart} type="button" className='btn btn-primary'>Order Now</button>
            {cartitems.length ? cartitems.map((cartitem) => {
                return <CartItem key={cartitem._id} cartitem={cartitem} />
            }):"No items to show in the Cart. Please Order Something!"}
        </div>
    )
}

export default Cart
