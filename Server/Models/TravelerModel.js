const mongoose = require('mongoose');

const TravelerSchema = new mongoose.Schema({
    travelerName:{
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
    followers:{
        type:Array,
    },
    followings:{
        type:Array
    },
    dob:{
        type:Date,
        required:true
    },
    images:{
        type:Array,
        required:true
    }
});

module.exports = mongoose.model("Traveler",TravelerSchema);