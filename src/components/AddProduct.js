import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import productContext from '../context/products/ProductContext'
import '../styles/AddProduct.css'

const AddProduct = () => {

    const context = useContext(productContext)
    const { addproduct } = context
    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState("");
    const [productdetails, setproductdetails] = useState({
        name: "",
        description: "",
        price: 0,
        image: ""
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const handleChange = (e) => {
        setproductdetails({ ...productdetails, [e.target.name]: e.target.value })
    }

    const handleCompleteSubmit = (e) => {
        e.preventDefault()
        addproduct(productdetails.title, productdetails.description, productdetails.price,productdetails.image)
        navigate('/')
    }


    return (
        <>
            <div className='container my-5 font' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h2 style={{marginTop:'15px'}}>Add the Product by filling the Details!</h2>
                <form action="post" onSubmit={handleCompleteSubmit}>
                    <div className='my-1'>
                        <h2>Add the Image</h2>

                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                            <label className=" my-2" htmlFor="exampleFormControlFile1">Select the Image of the Product</label>
                            <input type="file" className="form-control-file my-2" id="exampleFormControlFile1" onChange={handleFileChange} />
                            {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                        </div>

                    </div>
                    <div>
                        <h4>or (Any one of the following)</h4>
                    </div>
                    <div>
                        <label htmlFor="image" className="form-label">Link of Image</label>
                        <input disabled={selectedFile} type="text" className="form-control size" id="image" name='image' onChange={handleChange} />
                    </div>
                    <h3 className='my-3'>Product Details</h3>
                    <div>

                        <div className="mb-3 size">
                            <label htmlFor="title" className="form-label">Name of the Product</label>
                            <input type="text" className="form-control" id="title" name='title' required onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description of the Product</label>
                            <input type="text" className="form-control" id="description" name='description' required onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control" id="price" name='price' required onChange={handleChange} />
                        </div>

                    </div>
                    <input className="btn btn-primary my-2" type="submit" value="Add the Product" />
                </form>


            </div>
        </>

    )
}

export default AddProduct