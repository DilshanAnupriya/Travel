const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    traveler:{
        type:Object,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
    extraChargers:{ // additional room , foods 
        type:Array,
        required:true
    },
    status:{ //CONFIRM,CANCELLED,PENDING,REJECTED
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    roomType:{
        type:String,
        required:true
    },
    roomId:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
   
});

module.exports = mongoose.model('Booking',BookingSchema);