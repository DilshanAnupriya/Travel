const mongoose =  require('mongoose');

const GuiderSchema = new mongoose.Schema({
    guideName:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
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
    address:{  
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model("Guider",GuiderSchema);