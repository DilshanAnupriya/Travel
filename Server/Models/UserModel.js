const mongoose = require('mongoose');

const UserSchema = new  mongoose.Schema ({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fulName:{
        type:Number,
        required:true
    },
    role:{
        type:Array,//{roleName: 'ADMIN},{roleName:'USER'}
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
   
 
});

module.exports = mongoose.model('User', UserSchema);