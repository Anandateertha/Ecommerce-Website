import React from 'react'
import { Link } from 'react-router-dom'
import ReactGA from "react-ga4";
import '../styles/ProductItem.css'

const ProductItem = (props) => {

    const { product } = props

    const handleBuyClick = (title, price) => {
        ReactGA.event({
            category: title,
            action: "Click",
            label: "Buy Now Button",
            value: price
        });
    }

    const handleCartClick = (title, price) => {
        ReactGA.event({
            category: title,
            action: "Click",
            label: "Add to Cart Button",
            value: price
        });
    }

    return (
        <>

            <div className="col-md-3 item">
                <div className="card shadow mb-5 bg-body rounded " style={{ width: "18rem" }}>
                    <img src={`${product.image}`} className="card-img-top" alt={`${product.title}`} height='250px' />
                    <div className="card-body ">
                        <h5 className="card-title">{product.title}</h5>
                        <h6 className="card-text"><strong>{product.description.length > 60 ? `${product.description.slice(0, 75)}...` : product.title}</strong></h6>
                        <h6 className="card-text">₹{product.price}</h6>
                        <Link to={`/buynow/${product._id}`} onClick={() => handleBuyClick(product.title, product.price)} className="btn btn-primary my-1 mx-2">Buy Now</Link>
                        <Link to={`/buynow/${product._id}`} onClick={() => handleCartClick(product.title, product.price)} className={`btn btn-primary my-1 mx-2`}>Add to Cart</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductItem


