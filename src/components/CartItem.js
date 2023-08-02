import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import productContext from '../context/products/ProductContext'

const CartItem = (props) => {

    const {cartitem}=props
    const context = useContext(productContext)
    const { removeitemfromcart } = context

    const handleRemoveitemfromcart=(id)=>{
        removeitemfromcart(id)
    }

    return (
        <div className="col-md-3 my-2">
            <div className="card shadow mb-5 bg-body rounded" style={{ width: "18rem" }}>
                <img src={`${cartitem.image}`} className="card-img-top" alt={`${cartitem.title}`} height='250px' />
                <div className="card-body">
                    <h5 className="card-title">{cartitem.title}</h5>
                    <p className="card-text">{cartitem.description.length > 60 ? `${cartitem.description.slice(0, 60)}...` : cartitem.title}</p>
                    <p className="card-text">₹{cartitem.price}</p>
                    <Link to={`/cart`} onClick={()=>handleRemoveitemfromcart(cartitem._id)} className="btn btn-primary my-1 mx-2">Remove Item from the Cart</Link>
                </div>
            </div>
        </div>
    )
}

export default CartItem

