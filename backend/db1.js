const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.REACT_APP_DATABASE


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to Mongodb db');
    } catch (error) {
        console.log('Not Connected to Mongodb db')
    }
}


module.exports=connectToMongo



