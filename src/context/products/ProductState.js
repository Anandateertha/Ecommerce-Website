import ProductContext from './ProductContext'
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductState = (props) => {

    const host = 'http://localhost:5000'
    const productInitial = []
    const [products, setproducts] = useState(productInitial)
    const [alert, setalert] = useState({
        message: "",
        type: ""
    })

    const showAlert = (message, type) => {
        setalert({
            message: message,
            type: type
        })

        setTimeout(() => {
            setalert({
                message: "",
                type: ""
            })
        }, 1500);
    }

    const getallproducts = async (search) => {

        let response;
        if (search) {
            response = await fetch(`${host}/api/product/fetchbyname/${search}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
        else {
            response = await fetch(`${host}/api/product/fetchallproducts`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
        }

        const json = await response.json()
        setproducts(json)
    }

    const addproduct = async (title, description, price, image) => {
        const response = await fetch(`${host}/api/product/addproduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, price, image })
        })

        const addedProduct = await response.json()
        setproducts(products.concat(addedProduct))
        toast.success('Product has been Added Successfully', {
            position: 'top-right',
            autoClose: 3000,
        });
    }

    const deleteproduct = async (id) => {
        const response = await fetch(`${host}/api/product/deleteproduct/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json()
        console.log(json)

        const newProducts = products.filter((product) =>
            product._id !== id
        )
        setproducts(newProducts)
        toast.success('Product has been Deleted Successfully', {
            position: 'top-right',
            autoClose: 3000,
        });
    }

    const updateproduct = async (id, title, description, price, image) => {
        const response = await fetch(`${host}/api/product/updateproduct/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, price, image })
        })
        const json = await response.json()
        console.log(json)

        const updatedProduct = JSON.parse(JSON.stringify(products))

        
        for (let index = 0; index < updatedProduct.length; index++) {
            const element = updatedProduct[index];
            if (element._id === id) {
                updatedProduct[index].title = title
                updatedProduct[index].description = description
                updatedProduct[index].price = price
                updatedProduct[index].image = image
                break
            }

        }
        setproducts(updatedProduct)
        toast.success('Product has been Updated Successfully', {
            position: 'top-right',
            autoClose: 5000,
        });
    }

    const userOrders = async (id, quantity) => {
        const response = await fetch(`${host}/api/orderproduct/orderproduct/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ quantity })
        })
        const json = response.json()
        console.log(json)
    }

    const [ordersfromuser, setordersfromuser] = useState([])
    const yourorders = async () => {
        const response = await fetch(`${host}/api/orderproduct/yourorders`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setordersfromuser(json.sort((a,b)=>new Date(b.date) - new Date(a.date)))
    }
    const [listoforders, setlistoforders] = useState([])

    const orderfromcustomers = async () => {
        const response = await fetch(`${host}/api/orderproduct/orderfromusers`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setlistoforders(json)
    }

    const addingitemtocart = async (id, quantity) => {
        const response = await fetch(`${host}/api/orderproduct/cart/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ quantity })
        })
        
        toast.success('Item has been Added to the Cart', {
            position: 'top-right',
            autoClose: 3000,
        });
    }

    const [cartitems, setcartitems] = useState([])
    const itemsinthecart = async () => {
        const response = await fetch(`${host}/api/orderproduct/itemsincart`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token')
            },
        })
        const json = await response.json()
        setcartitems(json)
    }

    const removeitemfromcart = async (id) => {
        const response = await fetch(`${host}/api/orderproduct/removefromcart/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        })
        const newCart = cartitems.filter((cartitem) =>
            cartitem._id !== id
        )
        setcartitems(newCart)
        toast.error('Item has been removed from the cart Successfully', {
            position: 'top-right',
            autoClose: 3000,
        });
    }


    const orderingfromcart = async () => {
        const response = await fetch(`${host}/api/orderproduct/orderfromcart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setlistoforders(listoforders.concat(json))
    }

    const alertfromlogin = (msg) => {
        toast.success(`${msg}`, {
            position: 'top-right',
            autoClose: 3000,
        });
    }

    // const admins = ["admin Id's"]//Enter the Id of the Admin to get access to the Product Operations
    
    

    const [cartCount, setcartCount] = useState(0)
    const numberofitemsincart=()=>{
        setcartCount(cartitems.length)
    }

    return (
        <ProductContext.Provider value={{ products, getallproducts, addproduct, deleteproduct, updateproduct, userOrders, yourorders, ordersfromuser, orderfromcustomers, listoforders, addingitemtocart, itemsinthecart, cartitems, removeitemfromcart, orderingfromcart, alert, alertfromlogin, admins,numberofitemsincart,cartCount }}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState