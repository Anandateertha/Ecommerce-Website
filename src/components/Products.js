import React, { useContext, useEffect } from 'react'
import ProductItem from './ProductItem'
import productContext from '../context/products/ProductContext'
import { useNavigate } from 'react-router-dom'

const Products = () => {

    const context = useContext(productContext)
    const { products, getallproducts } = context
    const navigate=useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallproducts() 
        }
        else
        {
            navigate('/login')
        }
    }, [])



    return (
        <div className='container row mx-auto font' >
            <h2 className='my-4'>Products Available, Click Buy Now to Order!</h2>
            {products.map((product) => {
                return <ProductItem key={product._id} product={product}/>
            })}
        </div>
    )
}

export default Products

