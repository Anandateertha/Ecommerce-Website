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
        <div>
            {order.cart.length === 0 ?
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12">
                        <div className="card shadow-0 border rounded-3">
                            <div className="card-body">
                                <div className="row g-0">
                                    <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                                        <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                            <img src={`${order.image}`} className="w-100" alt="Product" />
                                            <div className="hover-overlay">
                                                <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} >

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-5 col-sm-7">
                                        <h5>Product : {order.title}</h5>
                                        <p className="text mb-4 mb-md-0 my-3">
                                            {order.description}
                                        </p>
                                        <h6 className="text mb-4 mb-md-0 my-3">
                                            Quantity : {order.quantity}
                                        </h6>
                                        <h6 className="text mb-4 mb-md-0 my-3">
                                            Ordered on : {formatDate(order.date)}
                                        </h6>
                                    </div>
                                    <div className="col-xl-3 col-md-3 col-sm-5">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h4 className="mb-1 me-1">₹{order.price}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="row justify-content-center mb-3">
                    {Array.from({ length: order.cart.length }, (_, index) => (
                        <div key={index} className="col-md-12">
                            <div className="card shadow-0 border rounded-3">
                                <div className="card-body">
                                    <div className="row g-0">
                                        <div className="col-xl-3 col-md-4">
                                            <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                                <img
                                                    src={`${order.cart[index].image}`}
                                                    className="w-100"
                                                    alt="Product"
                                                />
                                                <div className="hover-overlay">
                                                    <div
                                                        className="mask"
                                                        style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-md-8">
                                            <h6>Ordered from Cart</h6>
                                            <h5>Product : {order.cart[index].title}</h5>
                                            <p className="text mb-4 mb-md-0 my-3">
                                                {order.cart[index].description}
                                            </p>
                                            <h6 className="text mb-4 mb-md-0 my-3">
                                                Quantity : {order.cart[index].quantity}
                                            </h6>
                                            <h6 className="text mb-4 mb-md-0 my-3">
                                                Ordered on : {formatDate(order.date)}
                                            </h6>
                                        </div>
                                        <div className="col-xl-3 col-md-3 col-sm-5">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1">₹{order.cart[index].price}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            }
        </div >
    )
}

export default YourOrderItem

