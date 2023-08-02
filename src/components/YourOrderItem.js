import React from 'react'
import '../styles/YourOrderItem.css'

const YourOrderItem = (props) => {

    const { order } = props

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
      
        return `${day} ${month} ${year}`;
      }

    return (
        <div className="col-md-4 my-3 gap">
            {order.cart.length === 0 ?
                <div className="card shadow mb-5 bg-body rounded" style={{ width: "18rem" }}>
                    <div>
                        <img src={`${order.image}`} className="card-img-top" alt={`${order.title}`} height='250px' />
                        <div className="card-body">
                            <h5 className="card-title">Product : {order.title}</h5>
                            <p className="card-text"><strong>Description</strong> : {order.description.length >= 50 ? `${order.description.slice(0, 50)}...` : order.description}</p>    
                            <h6 className="card-text">₹{order.price}</h6>
                            <h6 className="card-text">Total Quantity : {order.quantity}</h6>
                            <h6 className="card-text">Ordered on : {formatDate(order.date)}</h6>
                        </div>
                    </div>
                </div> :
                <div className="card shadow mb-5 bg-body rounded" style={{ width: "28rem" }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {Array.from({ length: order.cart.length }, (_, index) => (
                                <div >
                                    <img src={`${order.cart[index].image}`} className="card-img-top" alt={`${order.cart[index].title}`} height='250px' />
                                    <div className="card-body">
                                        <h6>Ordered from Cart</h6>
                                        <h5 className="card-title">Product : {order.cart[index].title}</h5>
                                        <p className="card-text"><strong>Description</strong> : {order.cart[index].description.length >= 50 ? `${order.cart[index].description.slice(0, 50)}...` : order.cart[index].description}</p>
                                        <h6 className="card-text">₹{order.cart[index].price}</h6>
                                        <h6 className="card-text">Total Quantity : {order.cart[index].quantity}</h6>
                                        <h6 className="card-text">Ordered on : {formatDate(order.date)}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>}
        </div >
    )
}

export default YourOrderItem

