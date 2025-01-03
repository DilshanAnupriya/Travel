const Guide = require('../Models/GuiderModel');

const CreateGuider  = async(req,res)=>{
    try {
        const savedGuider = new Guide(req.body);
        await savedGuider.save();
        res.status(201).json({message:"succes",data:savedGuider});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const FindAllGuider  = async(req,res)=>{
    try {
        const {searchText='',page=1,size=10} = req.query;
        const query = searchText?{$or:[
            {guideName:{$regex:searchText,$options:"i"}},
            {fullName:{$regex:searchText,$options:"i"}},
            {area:{$regex:searchText,$options:"i"}}
        ]}:{};
        const all = await Guide.find(query).sort({ratings:-1}).skip((page-1)*size).limit(parseInt(size));
        const count = await Guide.countDocuments();
        res.status(200).json({message:"List",data:all,count:count});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const FindGuiderById  = async(req,res)=>{
    try {
        const selectedGuider = await Guide.findById(req.params.id);
        if(selectedGuider){
            return res.status(200).json({message:"success",data:selectedGuider});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const UpdateGuider  = async(req,res)=>{
    try {
        const updatedGuider = await Guide.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(updatedGuider){
            return res.status(200).json({message:"success",data:updatedGuider});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const DeleteGuider  = async(req,res)=>{
    try {
        const deletedGuider = await Guide.findByIdAndDelete(req.params.id);
        if(deletedGuider){
            return res.status(200).json({message:"success",data:deletedGuider});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const TopGuiders  = async(req,res)=>{
    try {
        const top = await Guide.topGuiders();
        res.status(200).json({message:"success",data:top});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
module.exports={
    CreateGuider,FindAllGuider,FindGuiderById,UpdateGuider,DeleteGuider,TopGuiders
}