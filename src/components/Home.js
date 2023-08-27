import React from 'react'
import Products from './Products'
import '../styles/Home.css'
import Footer from './Footer';
import { useEffect } from 'react';
import {cartItemfetch} from '../redux/slices/cartitems/index'
import { useDispatch } from 'react-redux';

const Home = () => {

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(cartItemfetch())
    }, [])

    return (
        <>
            <div className='back font'>
                <div id="carouselExampleCaptions" className="carousel slide images" data-bs-ride="carousel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <div className="carousel-inner" style={{ height: 'max-content', width: '800px', marginTop: '-145px' }}>
                        <div className="carousel-item active" data-bs-interval="1500">
                            <img src="https://cdn.tasteatlas.com//Images/Dishes/c16962366c9745e9b8cf4f17f3532a2e.jpg?w=905&h=510" className="d-block w-100" alt="Chakli" style={{ height: '500px' }} />
                            <div className="carousel-caption d-none d-md-block" style={{ marginTop: '15px' }}>
                                <h5 style={{ color: 'black' }}>Order Your Snacks Now</h5>
                                <p style={{ color: 'black' }}>Click on Buy Now to Order</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="1500">
                            <img src="https://cdn.tasteatlas.com//Images/Dishes/d69c2f9b128a49299056a0bb9eca8a45.jpg?w=905&h=510" className="d-block w-100" alt="vada" style={{ height: '500px' }} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Click Add to Cart to order at a time</h5>
                                <p>Have Fun and Order Again!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Products />
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home