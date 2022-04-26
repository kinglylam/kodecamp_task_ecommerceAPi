const ProductModel = require("../models/product");
 
 
 const createProduct = async (req, res) => {
    const {name,price,description,category} = req.body;
    const product=await ProductModel.create({name,price,description,category});
    if(!product){
        throw CustomError('bad request',400)
    }
    res.json({
        status:'success',
        data:product
    });
}

 const getAllProduct = async (req, res) => {
    const result=await ProductModel.find({});
    res.json({
        status:'success',
        data:result
    });
 }


const getOneProduct = async (req, res) => {
    const {id:_id} = req.params;
    const result=await ProductModel.findOne({_id});
    if(!result){
        throw CustomError('Product not found',404)
    }
    res.json({
        status:'success',
        data:result
    });
}

const updateProduct = async (req, res) => {
    const {id:_id} = req.params;
    const {name,price,description,category} = req.body;
    const result=await ProductModel.findOneAndUpdate({_id},{name,price,description,category},{new:true});
    if(!result){
        throw CustomError('Product not found',404)
    }
    res.json({
        status:'success',
        data:result
    });

}
const deleteProduct =async (req, res) => {
    const {id:_id} = req.params;
    const result=await ProductModel.findOneAndDelete({_id},{new:true});
    if(!result){
        throw CustomError('Product not found',404)
    }
    res.json({
        status:'success',
        data:result});
}
 module.exports = {createProduct, updateProduct, deleteProduct, getOneProduct, getAllProduct}
