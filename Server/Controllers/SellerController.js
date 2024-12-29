const Seller =  require('../Models/SellerModel');

const CreateSeller = async (req,res)=>{
    try {
        const SellerObj = new Seller(req.body);
        const CreatedSaller = await SellerObj.save();
        res.status(201).json({message:"success",data:CreatedSaller});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const FindAllSeller = async (req,res)=>{
    try {
        const {searchText='',page=1,size=10} = req.query;
        const filter = searchText?{$or:[
            {sellerName:{$regex:searchText,$options:'i'}}
        ]}:{};
        const allSellers = await Seller.find(filter).skip((page-1)*size).limit(parseInt(size));
        const count = await Seller.countDocuments()
        res.status(201).json({message:"list...",data:allSellers,count:count});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const FindSellerById = async (req,res)=>{
    try {
        const selectedSeller = await Seller.findById(req.params.id);
        if(selectedSeller){
            return res.status(200).json({message:"found",data:selectedSeller});
        }
        res.status(404).json({message:'not found'});

    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const UpdateSeller = async (req,res)=>{
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(updatedSeller){
            return res.status(200).json({message:"updated",data:updatedSeller});
        }
        res.status(404).json({message:'not found'});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}

const DeleteSeller = async (req,res)=>{
    try {
        const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
        if(deletedSeller){
            return res.status(203).json({message:"deleted",data:deletedSeller});
        }
        res.status(404).json({message:'not found'});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}
const HighestRatings = async (req,res)=>{
    try {
        const highest = await Seller.highestRatings();
        res.status(200).json({message:"highest rating list",data:highest});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
   
}

module.exports = {
    CreateSeller,FindAllSeller,FindSellerById,UpdateSeller,DeleteSeller,HighestRatings
};
