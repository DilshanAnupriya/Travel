const Traveler = require('../Models/TravelerModel');

const SaveTraveler = async(req,res)=>{
    try {
        const travelObj = new Traveler(req.body);
        const savedTraveler = await travelObj.save();
        res.status(201).json({message:"saved!",Data:savedTraveler});    
    } catch (e) {
        res.status(500).json({error:e.message});
    }
    
};

const findAllTravelers = async(req,res)=>{
    try {
        const {searchText='',page=1,size=10} = req.query;
        const filter = searchText?{$or:[
            {travelerName:{$regex:searchText,$options:'i'}},
            {fullName:{$regex:searchText,$options:'i'}},
        ]}:{};
        const allTravelers = await Traveler.find(filter).skip(page*size).limit(parseInt(size));    
        const total = await Traveler.countDocuments(filter);
        res.status(200).json({message:"List......",data:allTravelers,count:total});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};

const getTravelerById = async(req,res)=>{
    try {
        const selectedtraveler = await Traveler.findById(req.params.id);
        if(!selectedtraveler){
            return res.status(404).json({message:"not found"});
        }
        res.status(200).json({message:"Traveler",Data:selectedtraveler});

    } catch (error) {
        res.status(500).json({error:e.message});
    }
};

const updateTraveler = async(req,res)=>{
    try {
        const updatedTraveler = await Traveler.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(!updatedTraveler){
            return  res.status(500).json({error:e.message});
        }
        res.status(200).json({message:"Traveler updated!",Data:updatedTraveler});
    } catch (error) {
        res.status(500).json({error:e.message});
    }
};

const deleteTraveler = async(req,res)=>{
    try {
        const deletedTraveler =  await Traveler.findByIdAndDelete(req.params.id);
        if(!deletedTraveler){
            return res.status(404).json({message:"not found"});
        }
        res.status(200).json({message:"Traveler deleted!",data:deletedTraveler});
    } catch (error) {
        res.status(500).json({error:e.message});
    }
};

module.exports = {
    SaveTraveler,findAllTravelers,getTravelerById,updateTraveler,deleteTraveler
}

