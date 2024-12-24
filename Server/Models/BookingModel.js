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
    date:{
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
    contact:{
        type:String,
        required:true
    }
   
});

module.exports = mongoose.model('Booking',BookingSchema);