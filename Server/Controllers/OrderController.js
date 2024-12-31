const Order = require('../Models/OrderModel');

const CreatedOrder = async (req,res)=>{
    try {
        const OrderObj = new Order(req.body);
        await OrderObj.save();
        res.status(201).json({message:"success",data:OrderObj});
    } catch (e) {
        res.status(500).json({error:e.message})
    }
}

const FindAllOrder = async (req,res)=>{
    try {
        const {searchText='',page=1,size=10} = req.query;
        const filter = searchText?{$or:[
            {status:{$regex:searchText,$options:"i"}}
        ]}:{};
        const loadAll = await Order.find(filter).sort({Date:-1}).skip((page-1)*size).limit(parseInt(size));
        const count = await Order.countDocuments();
        res.status(200).json({message:"List...",data:loadAll,count:count});
    } catch (e) {
        res.status(500).json({error:e.message})
    }
}

const FindOrderById = async (req,res)=>{
    try {
        const selectedOrder =  await Order.findById(req.params.id);
        if(selectedOrder){
            res.status(200).json({message:"List...",data:selectedOrder});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message})
    }
}

const UpdateOrder = async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(updatedOrder){
            res.status(200).json({message:"success",data:updatedOrder});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message})
    }
}

const UpdateStatusOrder = async (req,res)=>{
    try {
        const {id} = req.params
        const {status} = req.body

        if(!["PENDING","COMPLETE","CANCELED","REJECTED"].includes(status)){
            return res.status(404).json({message:"invalid status",data:null});
        }
        const updatedStatus = await Order.findByIdAndUpdate(id,{status},{new:true});
        if(updatedStatus){
            return res.status(200).json({message:"success",data:updatedStatus});
        }
        res.status(404).json({message:"not found"});
    } catch (e) {
        res.status(500).json({error:e.message})
    }
}

const DeleteOrder = async (req,res)=>{
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if(deletedOrder){
            res.status(200).json({message:"deleted",data:deletedOrder});
        }
        res.status(404).json({message:"not found"});

    } catch (e) {
        res.status(500).json({error:e.message})        
    }
}

module.exports ={
    CreatedOrder,FindAllOrder,FindOrderById,UpdateOrder,UpdateStatusOrder,DeleteOrder
};