import React, { useEffect, useContext } from 'react'
import OderFromUsersItem from './OderFromUsersItem'
import productContext from '../context/products/ProductContext'

const OrderFromUsers = () => {

    const context = useContext(productContext)
    const { orderfromcustomers, listoforders } = context


    useEffect(() => {
        orderfromcustomers()
        document.title=`Hemadri's - Orders from Customers`
    }, [])
    return (
        <div className='container row mx-auto font' >
            <h2 style={{marginTop:'80px'}}>Orders from Customers</h2>
            {Array.from({ length: listoforders.length }, (_, index) => (
                <OderFromUsersItem key={listoforders[index]._id} listoforders={listoforders[index]} />
            ))}
        </div>

    )
}

export default OrderFromUsers

