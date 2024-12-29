const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const SignUp = async (req,res)=>{
    const {userName,password,fulName,role} = req.body;
    const userExists = await User.findOne({userName});
    if(userExists){
        res.status(404).json({message:"User already exists ",data:null});
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userObj =  new User({
            userName,
            password:hashedPassword,
            fulName,
            role,
            isActive:true
        });
         await userObj.save();
        res.status(201).json({message:"successfull ",data:userObj});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};

const Login = async (req,res)=>{
    const {userName,password} =  req.body;
    const userExist = await User.findOne({userName});
    if(!userExist){
        res.status(404).json({message:"User not found",data:null});
    }

    const isMatch = await bcrypt.compare(password,userExist.password);
    if(!isMatch){
        res.status(403).json({message:"wrong password",data:null});
    }
    const payload = {userId:userExist._id,userName:userExist.userName,role:userExist.role,};
    const token = jwt.sign(payload,JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({message:"successfull",data:{token:token}});

}

module.exports={SignUp,Login};