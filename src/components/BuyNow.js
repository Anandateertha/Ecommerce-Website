import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productContext from '../context/products/ProductContext';
import '../styles/BuyNow.css';

const BuyNow = () => {
    const host = 'http://localhost:5000'
    const { id } = useParams();
    const navigate = useNavigate()
    const context = useContext(productContext)
    const { userOrders,addingitemtocart } = context

    const [fetchedProduct, setfetchedProduct] = useState({
        title: "",
        description: "",
        price: null,
        image: ""
    })

    const [q, setq] = useState(0)
    const [p, setp] = useState(fetchedProduct.price)



    useEffect(() => {
        const fetchproductbyid = async (id) => {
            const response = await fetch(`${host}/api/product/fetchbyid/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjM2MyYjJhNTA2NWM5NjIwMzQxZjQ3In0sImlhdCI6MTY5MDYwNzEyMn0.hBYy5zClbwmqOVJR2Cze92DZzQH4MGwIn0x_mODkbNc"
                }
            })
            const json = await response.json()
            setfetchedProduct({
                title: json.title,
                description: json.description,
                price: json.price,
                image: json.image
            })
        }
        console.log(fetchedProduct)
        fetchproductbyid(id)
    }, []);

    const handleQuantity = (sign) => {
        if (sign === "+") {
            setq(prevState => prevState + 1)
            setp(prevState => prevState + fetchedProduct.price)
        }
        else {
            setq(prevState => prevState - 1)
            setp(prevState => prevState - fetchedProduct.price)
        }
    }

    const handleBuy = (id) => {
        if (q >= 1) {
            userOrders(id, q)
            console.log(`Product Id is ${id}`)
            navigate('/')
        }
        else
        {
            navigate(`/buynow/${id}`)
        }

    }

    const handleCart=(id)=>{
        if (q >= 1) {
            addingitemtocart(id,q)
            navigate('/')
        }
        else
        {
            navigate(`/buynow/${id}`)
        }
        
    }



    return (
        <div className='center '>
            <div className='card mb-3 shadow rounded' style={{ width: '30rem' }}>
                <img src={fetchedProduct.image} className='card-img-top imgsize' alt={fetchedProduct.title} />
                <div className='card-body'>
                    <h6 className='card-title'>{fetchedProduct.title}</h6>
                    <p className='card-text'>{fetchedProduct.description}</p>
                    <h6 className='card-text q'>Total ₹ {p}</h6>
                    <span className='quantity q'>
                        <button disabled={q <= 1} className='btn btn-primary mx-2' type='button' onClick={() => handleQuantity('-')}>  - </button>
                        <h4>{q}</h4>
                        <button className='btn btn-primary mx-2' type='button' onClick={() => handleQuantity('+')} > +</button>
                    </span>
                    <h6>Please Select the Quantity by pressing <strong>'+'</strong> or <strong>'-'</strong> Button Above and Click <strong>Buy Now</strong> to Order and click <strong>Add to Cart</strong> to add the item to Cart</h6>
                </div>
                <input onClick={() => handleBuy(id)} disabled={q<1?true:false} className="btn btn-primary my-1" type="submit" value="Buy Now" />
                <input onClick={() => handleCart(id)} disabled={q<1?true:false} className="btn btn-primary my-1" type="submit" value="Add to Cart" />
            </div>
        </div>
    );
}


export default BuyNow
