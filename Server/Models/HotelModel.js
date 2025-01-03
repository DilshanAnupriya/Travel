const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    hotelName:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{  
        type:String,
        required:true
    },
    packages:{ 
        type:Object,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    }
});
HotelSchema.statics.heighestRatings = function(){
    return this.find({rating:{$gt:8}});
}

module.exports = mongoose.model("Hotel",HotelSchema);