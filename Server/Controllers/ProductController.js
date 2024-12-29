const Product = require('../Models/ProductModel');


const CreateProduct = async (req,res)=>{
    try {
        const product  = new Product(req.body);
        const saveProduct = await product.save();
        res.status(201).json({message:'created successfully',data:saveProduct});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const FindAllProduct = async (req,res)=>{
    try {
        const {searchText='',page=0,size=10} = req.query;
        const filter = searchText?{$or:[
            {productName:{$regex:searchText,$options:'i'}}
        ]}:{};
        const allProduct = await Product.find(filter).skip(page*size).limit(parseInt(size));
        const count = await Product.countDocuments();
        res.status(200).json({message:'List ....',data:allProduct,count:count});
        
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const FindProductById = async (req,res)=>{
    try {
        const selectedProduct = await Product.findById(req.params.id);
        if(selectedProduct){
            return res.status(200).json({message:'product',data:selectedProduct});
        } 
        res.status(404).json({message:'not found'});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const UpdateProduct = async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(updatedProduct){
            return  res.status(200).json({message:'product updated',data:updatedProduct});
        }
        res.status(404).json({message:'not found'});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};
const DeleteProduct = async (req,res)=>{
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(deletedProduct){
            return res.status(200).json({message:'product deleted',data:deletedProduct});
        }
        res.status(404).json({message:'not found'});
    } catch (e) {
         res.status(500).json({error:e.message});
    }
};
const LowQtyProduct = async (req,res)=>{
    try {
        const lowQty = await Product.findLowQtyProduct();
        res.status(200).json({message:'Low list...',data:lowQty});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
};

module.exports ={
    CreateProduct,FindAllProduct,FindProductById,UpdateProduct,DeleteProduct,LowQtyProduct
}