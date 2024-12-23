const mongoose = require('mongoose');

const SellerSchema = new mongoose.Schema({
    sellerName:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{ 
        type:String,
        required:true
    },
    country:{ 
        type:String,
        required:true
    },
    isActive:{
        type:String,
        required:true
    },
    rating:{
        type:String,
    },
    images:{
        type:Array,
        required:true
    }
});

module.exports = mongoose.model("Seller",SellerSchema);