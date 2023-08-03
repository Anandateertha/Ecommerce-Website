import React, { useContext,useEffect } from 'react'
import productContext from '../context/products/ProductContext'
import YourOrderItem from './YourOrderItem'

const YourOrders = () => {

    const context = useContext(productContext)
    const { yourorders,ordersfromuser } = context

    useEffect(() => {
        yourorders()
        document.title=`Hemadri's - Your Orders`
    }, [])
    

    return (
        <div className='container row mx-auto font' >
            <h2 style={{marginTop:'70px'}}>Your Orders</h2>
            {ordersfromuser.map((order) => {
                return <YourOrderItem key={order._id} order={order} />
            })}
        </div>
    )
}

export default YourOrders

