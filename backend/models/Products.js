const mongoose=require('mongoose')
const {Schema} =mongoose

const ProductSchema=new Schema({
    image:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model('product',ProductSchema)

