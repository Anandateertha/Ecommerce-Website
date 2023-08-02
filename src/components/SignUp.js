import React, { useState } from 'react'
import '../styles/SignUp.css'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const host = 'http://localhost:5000'

    const navigate=useNavigate()

    const [signupCreds, setsignupCreds] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        password: ""
    })

    const handleChange = (e) => {
        setsignupCreds({ ...signupCreds, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name:signupCreds.name,phone:signupCreds.phone,email:signupCreds.email,address:signupCreds.address,password:signupCreds.password})
        })
        const json=await response.json()
        if (json.success) {
            navigate('/')
            localStorage.setItem('id',json.data.user.id)
            localStorage.setItem('token',json.authtoken)
            console.log(json.data.user.id)
        }
        else
        {
            navigate('/signup')
        }
    }


    return (
        <div>
            <section className="text-center text-lg-start all">
                <div className="container py-4">
                    <div className="row g-0 align-items-center">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="card cascading-right apply" >
                                <div className="card-body p-5 shadow-5 text-center">
                                    <h2 className="fw-bold mb-5">Sign up now</h2>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="text" id="name" className="form-control" onChange={handleChange} name='name' />
                                                    <label className="form-label" htmlFor="form3Example1" >Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <div className="form-outline">
                                                    <input type="number" id="phone" className="form-control" onChange={handleChange} name='phone' />
                                                    <label className="form-label" htmlFor="form3Example2">Phone</label>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="form-outline mb-4">
                                            <input type="email" id="email" className="form-control" onChange={handleChange} name='email' />
                                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="text" id="address" className="form-control" onChange={handleChange} name='address' />
                                            <label className="form-label" htmlFor="form3Example3">Address</label>
                                        </div>


                                        <div className="form-outline mb-4">
                                            <input type="password" id="password" className="form-control" onChange={handleChange} name='password' />
                                            <label className="form-label" htmlFor="form3Example4">Password</label>
                                        </div>


                                        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSignUp}>
                                            Create an Account
                                        </button>
                                        <p className="small fw-bold mt-2 pt-1 mb-0">Have an Account? <Link to="/login"
                                        className="link-danger">Go to Login</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
                                className="w-100 rounded-4 shadow-4 image" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp