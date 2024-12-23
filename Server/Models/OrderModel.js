const mongoose = require('mongoose');

const OrderSchema = new  mongoose.Schema ({
    products:{
        type:Array,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    traveler:{
        type:Object,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
   
 
});

module.exports = mongoose.model('Order', OrderSchema);