import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import productContext from '../context/products/ProductContext'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Products.css'
import ReactGA from "react-ga4";

const Products = () => {
    const host = 'http://localhost:5000'
    const context = useContext(productContext)
    const { products, getallproducts, numberofitemsincart } = context
    const navigate = useNavigate()
    const [bycondition, setbycondition] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallproducts()
            // eslint-disable-next-line
            numberofitemsincart()
            ReactGA.send({ hitType: "pageview", page: "/", title: "Products Page" });
        }
        else {
            navigate('/login')
        }
        document.title = `Hemadri's - Buy Your Snacks Now`
    }, [])

    const handleClick = async (condition) => {
        const checkboxes = document.querySelectorAll('.btn-check');
        const response = await fetch(`${host}/api/product/fetchallproducts`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json()
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
        if (condition === 'htl') {
            setbycondition(json.sort((a, b) => b.price - a.price))
            document.getElementById('btncheck1').checked = true;
        }
        else if (condition === 'lth') {
            setbycondition(json.sort((a, b) => a.price - b.price))
            document.getElementById('btncheck2').checked = true;
        }
        else if (condition === 'atz') {
            setbycondition(json.sort((a, b) => a.title.localeCompare(b.title)))
            document.getElementById('btncheck3').checked = true;
        }
        else if (condition === 'zta') {
            setbycondition(json.sort((a, b) => b.title.localeCompare(a.title)))
            document.getElementById('btncheck4').checked = true;
        }
        else {
            setbycondition(json)
            document.getElementById('btncheck5').checked = true;
        }

    }

    return (
        <>
            <div className="wrapper">
                <div className="outer">
                    <h6>Filter Options</h6>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck1" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck1" onClick={() => handleClick('htl')}>High to Low</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck2" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck2" onClick={() => handleClick('lth')}>Low to High</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck3" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck3" onClick={() => handleClick('atz')}>A-Z</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck4" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck4" onClick={() => handleClick('zta')}>Z-A</label>
                    </div>
                    <div className="btn-group column" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck5" />
                        <label className="btn btn-outline-primary" htmlFor="btncheck5" onClick={() => handleClick('clear')}>Clear Filters</label>
                    </div>
                </div>
                <div className='container row mx-auto font my-3'>
                    <h2>Products Available, Click Buy Now to Order!</h2>
                    {bycondition.length !== 0 ? bycondition.map((product) => {
                        return <ProductItem key={product._id} product={product} />;
                    })
                        : products.length !== 0 ? products.map((product) => {
                            return <ProductItem key={product._id} product={product} />;
                        })
                            : <div className="card" aria-hidden="true">
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
                                        <span className="placeholder col-4"></span>
                                        <span className="placeholder col-6"></span>
                                        <span className="placeholder col-8"></span>
                                    </p>
                                    <Link to="/" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></Link>
                                </div>
                            </div>}
                </div>
            </div>
        </>
    )
}

export default Products

