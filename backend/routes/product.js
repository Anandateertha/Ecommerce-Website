const express = require('express')
const Product = require('../models/Products')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


//ROUTE 1 : Fetch all the Products using "GET": '/api/product/fetchallproducts . Login Required

router.get('/fetchallproducts', fetchuser, async (req, res) => {

    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//Route 2 : Adding a New Product using "POSt" using '/api/product/addproduct . Login Required

router.post('/addproduct', fetchuser, [
    body('title', 'Enter a Valid Title name').isLength({ min: 3 }),
    body('description', 'Enter a valid description of minimun 5 characters').isLength({ min: 5 }),
    body('price', 'Enter a valid price').exists(),
    body('image', 'Enter a valid Image')
], async (req, res) => {

    try {
        const { title, description, price, image } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const product = new Product({
            title, description, price, image
        })

        const savedProduct = await product.save()

        res.send(savedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//ROUTE 3 : Deleting the product using "DELETE" by '/api/product/deleteproduct'

router.delete('/deleteproduct/:id', fetchuser, async (req, res) => {

    try {
        let product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).send('Not Found')
        }
        product = await Product.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Product has been deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})


//ROUTE 4 : Updating a Exisitng Product using "POST" : /api/product/updateproduct

router.put('/updateproduct/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, price, image } = req.body

        const newProduct = {}

        if (title) {
            newProduct.title = title
        }
        if (description) {
            newProduct.description = description
        }
        if (price) {
            newProduct.price = price
        }
        if (image) {
            newProduct.image = image
        }

        let product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404).send('Not Found')
        }

        product = await Product.findByIdAndUpdate(req.params.id, { $set: newProduct }, { new: true })
        res.json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//ROUTE 5 : Seraching the Product based on the given id using GET :'/api/product/fetchbyid'

router.get('/fetchbyid/:id', fetchuser, async (req, res) => {

    try {
        const productbyid = await Product.findById(req.params.id)
        res.json(productbyid)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

//ROUTE 6 : Searching a product based on the name given by the user by "GET" : '/api/product/fetchbyname'
router.get('/fetchbyname/:title', async (req, res) => {

    try {
        const productbyname = await Product.find({ title: { $regex: new RegExp(req.params.title, 'i') } });
        if (!productbyname) {
            res.status(400).send("Not Found")
        }
        res.json(productbyname)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})

module.exports = router
