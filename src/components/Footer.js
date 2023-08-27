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
                            <div className="col-md-4">
                                <h5>Contact Us</h5>
                                <ul className="list-unstyled ">
                                    <li>Phone : 1800 1256 1236</li>
                                    <li>Email : hemadris@gmail.com</li>
                                    <li>Address : SN Pet Bellari, Karnataka</li>
                                    <li><Link to="/" className="text-muted under">Instagram : @hemadri's</Link></li>
                                    <li><Link to="/" className="text-muted under">Facebook : @hemadris</Link></li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <h5>More about the Company</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/" className="text-muted under">About Us</Link></li>
                                    <li><Link to="/" className="text-muted under">Services</Link></li>
                                    <li><Link to="/" className="text-muted under">Products</Link></li>
                                    <li><Link to="/" className="text-muted under">Become a Seller</Link></li>
                                </ul>
                            </div>

                            <div className="col-md-4">
                                <form>
                                    <h5>Subscribe to get updates about New Products</h5>
                                    <p>Order your Favourite Snack Now and Stay Tuned.</p>
                                    <div className="d-flex gap-2">
                                        <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                        <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                        <button className="btn btn-primary" type="button">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between py-4 my-4">
                            <p>&copy; {new Date().getFullYear()} Company, Inc. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>

        </>
    )
}

export default Footer
