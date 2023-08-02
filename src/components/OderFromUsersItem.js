import React from 'react'
import '../styles/OrderFromUserItems.css'

const OderFromUsersItem = (props) => {

    const { listoforders } = props

    return (
        <div className="col-md-4 my-3 gap">
            {listoforders.cart.length === 0 ?
                <div className="card shadow bg-body rounded" style={{ width: "18rem" }}>
                    <div>
                        <img src={`${listoforders.image}`} className="card-img-top" alt={`${listoforders.title}`} height='250px' />
                        <div className="card-body">
                            <h3 className="card-title">Name : {listoforders.name}</h3>
                            <h3 className="card-title">Phone : {listoforders.phone}</h3>
                            <h3 className="card-title">Address: {listoforders.address}</h3>
                            <h3 className="card-title">Product : {listoforders.title}</h3>
                            <p className="card-text"><strong>Description</strong> : {listoforders.description.length >= 40 ? `${listoforders.description.slice(0, 40)}...` : listoforders.description}</p>
                            <h6 className="card-text">₹{listoforders.price}</h6>
                            <h6 className="card-text">Total Quantity : {listoforders.quantity}</h6>
                        </div>
                    </div>
                </div> :
                <div className="card shadow bg-body rounded" style={{ width: "30rem" }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <h6 className="card-title">Name : {listoforders.name}</h6>
                            <h6 className="card-title">Phone : {listoforders.phone}</h6>
                            <h6 className="card-title">Address: {listoforders.address}</h6>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {Array.from({ length: listoforders.cart.length }, (_, index) => (
                                <div >
                                    <img src={`${listoforders.cart[index].image}`} className="card-img-top" alt={`${listoforders.cart[index].title}`} height='250px' />
                                    <div className="card-body">
                                        <h5 className="card-title">Product : {listoforders.cart[index].title}</h5>
                                        <p className="card-text"><strong>Description</strong> : {listoforders.cart[index].description.length >= 40 ? `${listoforders.cart[index].description.slice(0, 40)}...` : listoforders.cart[index].description}</p>
                                        <h6 className="card-text">₹{listoforders.cart[index].price}</h6>
                                        <h6 className="card-text">Total Quantity : {listoforders.cart[index].quantity}</h6>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>}
        </div >
    )
}

export default OderFromUsersItem

