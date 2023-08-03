import React, { useContext, useEffect, useState } from 'react';
import productContext from '../context/products/ProductContext'

const Account = () => {

    const host = 'http://localhost:5000'
    const context = useContext(productContext)
    const { alertfromlogin } = context

    const [accountdetails, setaccountdetails] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        date:""
    })

    const formatDate=(inputDate)=> {
        const date = new Date(inputDate);
        const options = {
            day: "2-digit",
            month: "long",
            year: "numeric",
        };
        console.log(inputDate)

        return date.toLocaleString("en-IN", options);
    }


    useEffect(() => {
        const details = async () => {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            const json = await response.json()
            setaccountdetails({
                name: json.name,
                phone: json.phone,
                address: json.address,
                email: json.email,
                date:json.date
            })
        }

        details()
        document.title=`Hemadri's - Your Account`
        alertfromlogin("Your Account","success")

    }, [])

    return (
        <React.Fragment>
            <section style={{ backgroundColor: '#eee', marginTop: '55px' }} className='font'>
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
                                <ol className="breadcrumb mb-0">
                                    <li className="active" aria-current="page">Account Details</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{accountdetails.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{accountdetails.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{accountdetails.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{accountdetails.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Account Created in</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{formatDate(accountdetails.date)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Account;
