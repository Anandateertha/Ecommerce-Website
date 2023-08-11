import React, { useContext, useEffect, useState } from 'react'
import productContext from '../context/products/ProductContext'
import CartItem from './CartItem'

const Cart = () => {

    const context = useContext(productContext)
    const { itemsinthecart, cartitems,orderingfromcart } = context
    const [totalprice, settotalprice] = useState(null)

    useEffect(() => {
        itemsinthecart()
        document.title=`Hemadri's - Your Cart`
    }, [])

    useEffect(() => {
        const totalPrice = cartitems.reduce((acc, cartitem) => acc + cartitem.price, 0);
        settotalprice(totalPrice);
    }, [cartitems]);

    const handlebuyfromCart=()=>{
        orderingfromcart()
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
