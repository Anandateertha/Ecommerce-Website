const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User');
const crypto = require('crypto');
require('dotenv').config();

//ROUTE 1 : Getting the payment
router.post('/payment', fetchuser, async (req, res) => {
    var instance = new Razorpay({ key_id: process.env.REACT_APP_KEY, key_secret: process.env.REACT_APP_SECRET })

    try {
        let success = true
        const order = await instance.orders.create({
            amount: (req.body.p || req.body.totalprice) * 100,
            currency: "INR"
        })
        const user = await User.findById(req.user.id).select("-password")
        res.json({ success, 'Amount received': order.amount, "Status": "Success", user, order })
    } catch (error) {
        let success = false
        console.log(error)
        res.status(500).json({ success, message: 'Internal Server Error' })
    }
})

//ROUTE 2 : Verifying the payment if it is true or false
const secret = process.env.REACT_APP_SECRET; 

router.post('/verify', async (req, res) => {
    try {
        const order_id = req.header('order_id');
        const razorpay_payment_id = req.header('razorpay_payment_id');
        const razorpay_signature = req.header('razorpay_signature');

        const data = order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(data)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            res.json({ msg: 'Signature valid', success: true });
        } else {
            res.json({ msg: 'Signature invalid', success: false });
        }
    } catch (error) {
        console.error('Error during verification:', error);
        res.status(500).json({ msg: 'Internal Server Error', success: false });
    }
});




module.exports = router
