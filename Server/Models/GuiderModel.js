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
    },
    area:{
        type:String,
        required:true
    },
    ratings:{
        type:Number,
        required:true
    }
});
GuiderSchema.statics.topGuiders = function(){
    return this.find({ratings:{$gt:8}})
};
module.exports = mongoose.model("Guider",GuiderSchema);