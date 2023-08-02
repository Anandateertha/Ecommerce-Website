import React, { useContext, useEffect } from 'react'
import DeleteItem from './DeleteItem'
import productContext from '../context/products/ProductContext'

const DeleteProduct = () => {

  const context = useContext(productContext)
  const { products, getallproducts } = context


  useEffect(() => {
    getallproducts()

  }, [])


  return (
    <>
      <div className='container row mx-auto my-5 font' >
        <h2 className='my-4'>Deleting the Product</h2>
        {products.map((product) => {
          return <DeleteItem key={product._id} product={product} message={"Delete Product"} />
        })}

      </div>
    </>
  )
}

export default DeleteProduct