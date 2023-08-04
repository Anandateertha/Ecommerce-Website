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
        document.title=`Hemadri's - Buy Your Snacks Now`
    }, [])


    return (
        <div className='container row mx-auto font my-3' >
            <h2>Products Available, Click Buy Now to Order!</h2>
            {products.length!==0?products.map((product) => {
                return <ProductItem key={product._id} product={product}/>
            }):"No items found"}
        </div>
    )
}

export default Products

