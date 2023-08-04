import React from 'react'
import Products from './Products'
import '../styles/Home.css'

const Home = () => {
    return (
        <>
            <div className='back font'>
                <div id="carouselExampleCaptions" className="carousel slide images" data-bs-ride="carousel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner" style={{ height: '800px', width: '800px', marginTop: '45px' }}>
                        <div className="carousel-item active" data-bs-interval="1500">
                            <img src="https://media.istockphoto.com/id/852192776/photo/namkeen-collection.jpg?b=1&s=612x612&w=0&k=20&c=oZXAK8VA-5Pun_3kE3_HkI5aaabe7t4lZf0G9vrIXFw=" className="d-block w-100" alt="..." style={{height:'500px'}} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 style={{ color: 'black' }}>Order Your Snacks Now</h5>
                                <p style={{ color: 'black' }}>Click on Buy Now to Order</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="1500">
                            <img src="https://media.istockphoto.com/id/1169097707/photo/spicy-and-hot-parippu-vada-and-indian-tea.jpg?b=1&s=612x612&w=0&k=20&c=o-OkgdAUXY6rD5K7g-W4M2r5YRl2-NNraVxQlnicFWE=" className="d-block w-100" alt="..." style={{height:'500px'}} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Click Add to Cart to order at a time</h5>
                                <p>Have Fun!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div><Products /></div>
        </>
    )
}

export default Home