import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

const Footer = () => {
    return (
        <>
            <div className='foot'>
                <hr />
                <div className="container">
                    <footer className="py-5">
                        <div className="row">
                            <div className="col-3">
                                <h5>Contact Us</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2">Phone : 1800 1256 1236</li>
                                    <li className="nav-item mb-2">Email : hemadris@gmail.com</li>
                                    <li className="nav-item mb-2">Address : SN Pet Bellari, Karnataka</li>
                                    <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Instagram : @hemadri's</Link></li>
                                    <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Facebook : @hemadris</Link></li>
                                </ul>
                            </div>

                            <div className="col-3">
                                <h5>More about the Company</h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About Us</Link></li>
                                    <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Services</Link></li>
                                    <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Products</Link></li>
                                    <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Become a Seller</Link></li>
                                </ul>
                            </div>

                            <div className="col-3 offset-1">
                                <form>
                                    <h5>Subscribe to get updates about New Products</h5>
                                    <p>Order your Favourite Snack Now and Stay Tuned.</p>
                                    <div className="d-flex w-100 gap-2">
                                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                        <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                        <button className="btn btn-primary" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between py-4 my-4">
                            <p>&copy; 2023 Company, Inc. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Footer
