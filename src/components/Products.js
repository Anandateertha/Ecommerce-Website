import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import productContext from '../context/products/ProductContext'
import { useNavigate } from 'react-router-dom'
import '../styles/Products.css'

const Products = () => {

    const context = useContext(productContext)
    const { products, getallproducts } = context
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallproducts()
            // eslint-disable-next-line
        }
        else {
            navigate('/login')
        }
        document.title = `Hemadri's - Buy Your Snacks Now`
    }, [])



    const handleClick = (condition) => {

    }



    return (
        <>
            <div className="wrapper">
                <div className="outer">
                    <h6>Filter Options</h6>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck5" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck5" onClick={() => handleClick('clear')}>Clear Filter</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck1" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck1" onClick={() => handleClick('htl')}>High to Low</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck2" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck2" onClick={() => handleClick('lth')}>Low to High</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck3" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck3" onClick={() => handleClick('atz')}>A-Z</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck4" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck4" onClick={() => handleClick('zta')}>Z-A</label>
                    </div>
                </div>

                <div className='container row mx-auto font my-3' >
                    <h2>Products Available, Click Buy Now to Order!</h2>

                    {products.length !== 0 ? products.map((product) => {
                        return <ProductItem key={product._id} product={product} />
                    }) : "No items found"}
                </div>
            </div>
        </>
    )
}

export default Products

