const express = require('express')
const { Userordered, CartItem } = require('../models/Userordered');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User');
const Products = require('../models/Products');
const { useState } = require('react');

//ROUTE 1 : Adding a Item by the User using POST :'/api/orderproduct/orderproduct

router.post('/orderproduct/:id', fetchuser, async (req, res) => {

    try {
        let product = await Products.findById(req.params.id)

        if (!product) {
            return res.status(404).send('Not Found')
        }

        let userDetails = await User.findById(req.user.id)
        let id = req.user.id
        let name = userDetails.name
        let phone = userDetails.phone
        let address=userDetails.address
        let title = product.title
        let description = product.description
        let quantity=req.body.quantity
        let price = product.price*quantity
        let image=product.image


        let order = new Userordered(
            { id, name, phone,address, title, description, price,quantity,image }
        )

        console.log(order)
        const savedProduct = await order.save()

        res.json(savedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//ROUTE 2 : Adding items to the CART using POST : '/api/orderproduct/cart'


router.post('/cart/:id', fetchuser, async (req, res) => {

    try {
        let product = await Products.findById(req.params.id)
        if (!product) {
            return res.status(404).send('Not Found')
        }
        let quantity=req.body.quantity


        let cart = new CartItem(
            { id: req.user.id, title: product.title, description: product.description, price: product.price*quantity,address:product.address,quantity:req.body.quantity,image:product.image }
        )

        let savedCartItems = await cart.save()

        res.json(savedCartItems)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})



//ROUTE 3 : Ordring items form the Cart using POST :'/api/orderproduct/orderfromcart

router.post('/orderfromcart', fetchuser, async (req, res) => {

    try {
        let userDetails = await User.findById(req.user.id)
        let id = req.user.id
        let name = userDetails.name
        let phone = userDetails.phone
        let address = userDetails.address

        let cart = await CartItem.find()
        console.log(cart)

        let orderCart = new Userordered({
            id, name, phone, address, cart
        })

        const savedProduct = await orderCart.save()

        res.json(savedProduct)
        // await CartItem.deleteMany({})
        await CartItem.deleteMany({id: req.user.id });
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }


})

//ROUTE 4 : Removing the items from the Cart using POST : '/api/orderproduct/removefromcart'

router.delete('/removefromcart/:id',fetchuser, async (req, res) => {

    try {
        const item = await CartItem.findOne({ _id: req.params.id, id: req.user.id })
        // const deletedItem = await CartItem.deleteOne({ _id: req.params.id, id: req.user.id });

        if (!item) {
            res.status(400).send('Not Found in the Cart')
        }
        await CartItem.deleteOne({ _id: req.params.id, id: req.user.id });
        res.json({ "Success": "The Item has been removed from the Cart" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//ROUTE 5 : Viewing the Products of a particulat Customer using "GET" by '/api/orderproduct/yourorders/:id'
router.get('/yourorders',fetchuser,async(req,res)=>{

    const yourorders=await Userordered.find({id:req.user.id})
    res.json(yourorders)

})

//ROUTE 6 : Getting all the Orders from the Customers
router.get('/orderfromusers',async(req,res)=>{

    const userorders=await Userordered.find()
    res.json(userorders)

})

//ROUTE 7 : Fetching the Products which are added to the Cart using GET : '/api/orderproduct/itemsincart
router.get('/itemsincart',fetchuser,async(req,res)=>{
    const itemsinthecart=await CartItem.find({id:req.user.id})
    res.json(itemsinthecart)
})


module.exports = router