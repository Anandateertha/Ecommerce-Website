import React, { useState } from 'react'
import '../styles/Login.css'
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
    const host = 'http://localhost:5000'
    const navigate=useNavigate()
    const [creds, setcreds] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setcreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: creds.email, password: creds.password })
        })
        const json=await response.json()

        if (json.success) {
            localStorage.setItem('adminId',json.data.user.id)
            localStorage.setItem('token',json.authtoken)
            console.log(json.data.user.id)
            navigate('/')
        }
        else
        {
            navigate('/login')
        }
    }

    return (
        <div style={{ marginTop: '100px' }}>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample image" />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address" name='email' onChange={handleChange} />
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                </div>


                                <div className="form-outline mb-3">
                                    <input type="password" id="password" className="form-control form-control-lg"
                                        placeholder="Enter password" name='password' onChange={handleChange} />
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button onClick={handleLogin} type="button" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: '2.5rem' }}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                                        className="link-danger">Register</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login