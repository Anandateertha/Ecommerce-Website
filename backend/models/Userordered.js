const mongoose = require('mongoose')
const { Schema } = mongoose


const cartItemSchema = new Schema({
    id: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type:Number
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const UserorderedSchema = new Schema({
    id:{
        type:String,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address:{
        type:String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    cart: {
        type: [cartItemSchema],
    },
    quantity:{
        type:Number
    },
    image:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const Userordered = mongoose.model('userordered', UserorderedSchema); // Named as Userordered model
const CartItem = mongoose.model('cartItem', cartItemSchema); // Named as CartItem model

module.exports = { Userordered, CartItem };


