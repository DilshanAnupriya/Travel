const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    order:{
        type:Object,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    extraChargers:{  
        type:Array,
        required:true
    },
    discount:{ 
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    transactionDetails:{
        type:Object,
        requiered:true
    }
});

module.exports = mongoose.model("Payment",PaymentSchema);