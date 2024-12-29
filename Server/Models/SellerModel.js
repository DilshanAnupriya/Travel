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
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    }
});
SellerSchema.statics.highestRatings = function(){
    return this.find({rating:{$gt:7}});
} 

module.exports = mongoose.model("Seller",SellerSchema);