const Hotel = require('../Models/HotelModel');

const CreateHotel = async (req,res)=>{
    try {
        const hotel = new Hotel(req.body);
        await hotel.save();
        res.status(201).json({message:"success",data:hotel});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const FindAllHotel = async (req,res)=>{
    try {
        const {searchText='',page=1,size=10} = req.query;
        const filter = searchText?{hotelName:{$regex:searchText,$options:"i"}}:{};
        const all = await Hotel.find(filter).sort({rating:-1}).skip((page-1)*size).limit(parseInt(size));
        const count = await Hotel.countDocuments();
        res.status(200).json({message:"list",data:all,count:count});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const FindHotelById = async (req,res)=>{
    try {
        const selectedHotel = await Hotel.findById(req.params.id);
        if(selectedHotel){
            return res.status(200).json({message:"succes",data:selectedHotel});
        }
        res.status(404).json({message:"not found"});

    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const UpdateHotel = async (req,res)=>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(updatedHotel){
            return res.status(200).json({message:"succes",data:updatedHotel});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const DeleteHotel = async (req,res)=>{
 try {
        const deletedHotel = await Order.findByIdAndDelete(req.params.id);
        if(deletedHotel){
            res.status(200).json({message:"deleted",data:deletedHotel});
        }
        res.status(404).json({message:"not found"});

    } catch (e) {
        res.status(500).json({error:e.message})        
    }
}


module.exports ={
    CreateHotel,FindAllHotel,FindHotelById,UpdateHotel,DeleteHotel
}
