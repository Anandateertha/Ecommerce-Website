import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = (props) => {

    const { product } = props

    return (
        <>

            <div className="col-md-3">
                <div className="card shadow mb-5 bg-body rounded" style={{ width: "18rem" }}>
                    <img src={`${product.image}`} className="card-img-top" alt={`${product.title}`} height='250px' />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <h6 className="card-text"><strong>{product.description.length > 60 ? `${product.description.slice(0, 75)}...` : product.title}</strong></h6>
                        <h6 className="card-text">₹{product.price}</h6>
                        <Link to={`/buynow/${product._id}`} className="btn btn-primary my-1 mx-2">Buy Now</Link>
                        <Link to={`/buynow/${product._id}`} className={`btn btn-primary my-1 mx-2`}>Add to Cart</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductItem


