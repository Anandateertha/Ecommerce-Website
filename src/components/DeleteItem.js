import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import productContext from '../context/products/ProductContext'

const ProductItem = (props) => {

    const { message, product } = props
    const context = useContext(productContext)
    const { deleteproduct } = context
    const handleDelete = (id) => {
        deleteproduct(id)
    }


    return (
        <>
            <div className="col-md-3 my-1 font">
                <div className="card shadow mb-5 bg-body rounded" style={{ width: "18rem" }}>
                    <img src={`${product.image}`} className="card-img-top" alt={`${product.title}`} height='250px' />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <h6 className="card-text"><strong>{product.description.slice(0, 69)}...</strong></h6>
                        <h6 className="card-text">₹{product.price}</h6>
                        <Link to="/deleteproduct" className="btn btn-primary my-1 mx-2" onClick={()=>handleDelete(product._id)} >{message}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem

