import React from 'react'
import '../styles/OrderFromUserItems.css'

const OderFromUsersItem = (props) => {

    const { listoforders } = props

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        listoforders.cart.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice;
    };


    return (
        <div className="font">
            {listoforders.cart.length === 0 ?
                <div className="row justify-content-center mb-3">
                    <div className="col-md-12">
                        <div className="card shadow-0 border rounded-3">
                            <div className="card-body">
                                <div className="row g-0">
                                    <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                                        <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                            <img src={`${listoforders.image}`} className="w-100" alt="Product" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-5 col-sm-7">
                                        <h6 className="card-title">Name : {listoforders.name}</h6>
                                        <h6 className="card-title">Phone : {listoforders.phone}</h6>
                                        <h6 className="card-title">Address: {listoforders.address}</h6>
                                        <p className="text mb-4 mb-md-0 my-3">
                                            <h5 className="card-title">Product : {listoforders.title}</h5>
                                        </p>
                                        <h6 className="text mb-4 mb-md-0 my-3">
                                            <h6 className="card-text">Total Quantity : {listoforders.quantity}</h6>
                                        </h6>
                                        <h6 className="text mb-4 mb-md-0 my-3">
                                            <h6 className="card-text">Ordered on : {formatDate(listoforders.date)}</h6>
                                        </h6>
                                    </div>
                                    <div className="col-xl-3 col-md-3 col-sm-5">
                                        <div className="d-flex flex-row align-items-center mb-1">
                                            <h6 className="card-text">₹{listoforders.price}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="card shadow bg-body rounded my-4">
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                        <div>
                            <h6 className="card-title">Name : {listoforders.name}</h6>
                            <h6 className="card-title">Phone : {listoforders.phone}</h6>
                            <h6 className="card-title">Address: {listoforders.address}</h6>
                        </div>
                        <div className="justify-content-center mb-3">
                            {Array.from({ length: listoforders.cart.length }, (_, index) => (
                                <div key={index} className="col-md-12">
                                    <div className="card shadow-0 border rounded-3">
                                        <div className="card-body" >
                                            <div className="row g-0">
                                                <div className="col-xl-3 col-md-4">
                                                    <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                                                        <img src={`${listoforders.cart[index].image}`} className="w-100" alt="Product" />
                                                    </div>
                                                </div>
                                                <div className="col-xl-6 col-md-8">
                                                    <h5>Product : {listoforders.cart[index].title}</h5>
                                                    <h6 className="text mb-4 mb-md-0 my-3">
                                                        Total Quantity : {listoforders.cart[index].quantity}
                                                    </h6>
                                                    <h6 className="text mb-4 mb-md-0 my-3">
                                                        Ordered on : {formatDate(listoforders.date)}
                                                    </h6>
                                                </div>
                                                <div className="col-xl-3 col-md-3 col-sm-5">
                                                    <div className="d-flex flex-row align-items-center mb-1">
                                                        <h4 className="mb-1 me-1">₹{listoforders.cart[index].price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                            <div className="col-md-12">
                                <div className="card shadow-0 border rounded-3">
                                    <div className="card-body">
                                        <div className="row g-0">
                                            <div className="col-md-9">
                                                <h5><strong>Total Price</strong></h5>
                                            </div>
                                            <div className="col-md-3">
                                                <h5><strong>₹{calculateTotalPrice()}</strong></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>}
        </div >
    )
}

export default OderFromUsersItem

