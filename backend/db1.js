const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/ecommerce'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to Mongodb db');
    } catch (error) {
        console.log('Not Connected to Mongodb db')
    }
}


module.exports=connectToMongo



