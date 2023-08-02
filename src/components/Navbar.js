import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location=useLocation()
    const navigate=useNavigate()
    const logout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
        console.log(localStorage.getItem('token'))
    }
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-dark shadow-lg p-2 fixed-top ${location.pathname==='/login'|| location.pathname==='/signup'?"d-none":""} font`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fst-itali" to="/">Hemadri's</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className={`nav-item dropdown `}>
                                <Link className={`nav-link dropdown-toggle ${localStorage.getItem('adminId')!=="64c3c2b2a5065c9620341f47"?"d-none":""}`} to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin Product Operations
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="/addproduct">Add Product</Link></li>
                                    <li><Link className="dropdown-item" to="/updateproduct">Update Product</Link></li>
                                    <li><Link className="dropdown-item" to="/deleteproduct">Delete Product</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" to="/orderfromusers"><strong>Orders from Customers</strong></Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-2" type="button" to="/yourorders" style={{width:'200px'}} role="button">Your Orders</Link>
                            <Link className={`btn btn-primary mx-2  ${location.pathname==='/cart'?"d-none":""}`} to="/cart" role="button">Cart</Link>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                            <button onClick={logout} type="button" className='btn btn-primary' style={{width:'246px',marginLeft:'10px'}}>Log out</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar