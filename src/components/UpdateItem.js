import React from 'react'
import { Link } from 'react-router-dom'

const UpdateItem = (props) => {
    const { product,updatingProduct } = props

    return (
        <>
            <div className="col-md-3 my-3 font">
                <div className="card shadow mb-5 bg-body rounded" style={{ width: "18rem" }}>
                    <img src={`${product.image}`} className="card-img-top" alt={`${product.title}`} height='250px' />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <h6 className="card-text"><strong>{product.description.slice(0, 69)}...</strong></h6>
                        <h6 className="card-text">₹{product.price}</h6>
                        <Link to="/updateproduct" className="btn btn-primary my-1 mx-2" onClick={() => updatingProduct(product)}>Update Product</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateItem

