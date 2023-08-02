import React, { useContext, useEffect, useState, useRef } from 'react'
import UpdateItem from './UpdateItem'
import productContext from '../context/products/ProductContext'

const UpdateProduct = () => {

    const context = useContext(productContext)
    const { products, getallproducts, updateproduct } = context
    const ref = useRef()

    useEffect(() => {
        getallproducts()
        // eslint-disable-next-line
    }, [])

    const [productDetails, setproductDetails] = useState({
        productId: "",
        eimage: "",
        etitle: "",
        edescription: "",
        eprice: ""
    })

    const updatingProduct = (product) => {
        ref.current.click()
        setproductDetails({ productId: product._id, eimage: product.image, etitle: product.title, edescription: product.description, eprice: product.price })
    }

    const handleChange = (e) => {
        setproductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const handleUpdate = () => {
        updateproduct(productDetails.productId, productDetails.etitle, productDetails.edescription, productDetails.eprice, productDetails.eimage)
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Details of the Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body font">
                            <div>
                                <div className="mb-3 size">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="text" className="form-control" id="eimage" name='eimage' onChange={handleChange} value={productDetails.eimage} />
                                </div>
                                <div className="mb-3 size">
                                    <label htmlFor="title" className="form-label">Name of the Product</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' required onChange={handleChange} value={productDetails.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description of the Product</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' required onChange={handleChange} value={productDetails.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" className="form-control" id="eprice" name='eprice' required onChange={handleChange} value={productDetails.eprice} />
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>Update Product Details</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container row mx-auto my-5 font' >
                <h2 className='my-4'>Updating the Product</h2>
                {products.map((product) => {
                    return <UpdateItem key={product._id} product={product} updatingProduct={updatingProduct} />
                })}

            </div>
        </>
    )
}

export default UpdateProduct