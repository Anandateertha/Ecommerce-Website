import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import productContext from '../context/products/ProductContext';
import '../styles/BuyNow.css';
import ReactGA from "react-ga4";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { increment } from '../redux/slices/cartitems/index'
import { useDispatch, useSelector } from 'react-redux';

const BuyNow = () => {
    const host = 'http://localhost:5000'
    const { id } = useParams();
    const navigate = useNavigate()
    const context = useContext(productContext)
    const { userOrders, addingitemtocart } = context
    const dispatch = useDispatch()

    const [fetchedProduct, setfetchedProduct] = useState({
        title: "",
        description: "",
        price: null,
        image: ""
    })

    const [q, setq] = useState(0)
    const [p, setp] = useState(fetchedProduct.price)

    const [loading, setloading] = useState(false)


    useEffect(() => {
        const fetchproductbyid = async (id) => {
            const response = await fetch(`${host}/api/product/fetchbyid/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setfetchedProduct({
                title: json.title,
                description: json.description,
                price: json.price,
                image: json.image
            })
            setloading(true)
            document.title = `Hemadri's - ${json.title}`
        }
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

    const handleRazorpayOpen = (order, user) => {
        const options = {
            key: process.env.REACT_APP_KEY,
            amount: p,
            currency: "INR",
            name: "Hemadri's",
            description: "It is a ecommerce website from where you can order your favourite snack and get delivered to your door step!",
            order_id: order.id,
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone
            },
            notes: {
                address: "Hemadri's at Bellari"
            },
            handler: async function (response) {

                try {
                    const responses = await fetch(`${host}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'order_id': response.razorpay_order_id,
                            'razorpay_payment_id': response.razorpay_payment_id,
                            'razorpay_signature': response.razorpay_signature
                        }
                    })
                    const json = await responses.json()
                    if (json.success) {
                        userOrders(id, q);
                        toast.success('Payment Successfull and Your Order is placed', {
                            position: 'top-right',
                            autoClose: 5000,
                        });
                        ReactGA.event({
                            category: fetchedProduct.title,
                            action: "Ordered Successfully",
                            label: "Clicked on Buy Now for payment",
                            value: fetchedProduct.price
                        });
                        navigate('/')
                    }
                    else {
                        toast.error('Payment UnSuccessfull', {
                            position: 'top-right',
                            autoClose: 5000,
                        });
                    }
                } catch (error) {
                    console.error('Error during payment verification:', error);
                }


            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const handleBuy = async (id) => {
        if (q >= 1) {
            try {
                const response = await fetch(`${host}/api/payment/payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token')
                    },
                    body: JSON.stringify({ p })
                });

                const json = await response.json();

                if (json.success) {
                    handleRazorpayOpen(json.order, json.user);
                } else {
                    console.log('Failed to initiate payment');
                }
            } catch (error) {
                console.error('Error during payment initiation:', error);
                navigate(`/buynow/${id}`);
            }


        }
        else {
            navigate(`/buynow/${id}`)
        }
    }

    const handleCart = (id) => {
        if (q >= 1) {
            addingitemtocart(id, q)
            dispatch(increment())
            navigate('/')
        }
        else {
            navigate(`/buynow/${id}`)
        }
    }



    return (
        <>
            <div className='center'>
                {loading ? <div className='card mb-3 shadow rounded' style={{ width: '30rem' }}>
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
                    <input onClick={() => handleBuy(id)} disabled={q < 1 ? true : false} className="btn btn-primary my-1" type="submit" value="Buy Now" />
                    <input onClick={() => handleCart(id)} disabled={q < 1 ? true : false} className="btn btn-primary my-1" type="submit" value="Add to Cart" />
                </div> : <div className="card" aria-hidden="true" style={{ width: "420px", height: '500px' }}>
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></a>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6"></span>
                        </h5>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></a>
                    </div>
                </div>}
            </div>
        </>
    );
}


export default BuyNow
