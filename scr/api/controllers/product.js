const ProductModel = require("../models/product");
  
 const createProduct = async (req, res) => {
    const {name,price,description,category} = req.body;
    const product=await ProductModel.create({name,price,description,category});
    product.save();
    if(!product){
        throw CustomError('bad request',400)
    }
    try {
        res.json({
            status:'success',
            data:product
        });
    } catch (error) {
        console.log(error);
    }
};

 const getAllProduct = async (req, res) => {
    const result=await ProductModel.find({});
    try {
        res.json({
            status:'success',
            data:result
        });
    } catch (error) {
        console.log(error);
    }
 };

const getOneProduct = async (req, res) => {
    const {id:_id} = req.params;
    const result=await ProductModel.findOne({_id});
    if(!result){
        throw CustomError('Product not found',404)
    }
    try {
        res.json({
            status:'success',
            data:result
        });
    } catch (error) {
       console.log(error) ;
    }
}

const updateProduct = async (req, res) => {
    const {id:_id} = req.params;
    const {name,price,description,category} = req.body;
    const result=await ProductModel.findOneAndUpdate({_id},{name,price,description,category},{new:true});
    if(!result){
        throw CustomError('Product not found',404)
    }
    try {
        res.json({
            status:'success',
            data:result
        });
    } catch (error) {
        console.log(error);
    }

}
const deleteProduct =async (req, res) => {
    const {id:_id} = req.params;
    const result=await ProductModel.findOneAndDelete({_id},{new:true});
    if(!result){
        throw CustomError('Product not found',404)
    }
    try {
        res.json({
            status:'success',
            data:result});
    } catch (error) {
        console.log(error)
    }
}

const filterProduct = async (req, res) => {
    const {category,name,sortBy="price"}=req.query;
    const queryBy={}
    if(category){
        queryBy.category=category
    }
    if(name){
        queryBy.name={$regex:name,$options:'i'}
    }

    const result=await ProductModel.find(queryBy).sort({[sortBy]:1});
    try {
        res.json({
            status:'success',
            data:result
        });
    } catch (error) {
        console.log(error);
    }
}
 module.exports = {createProduct, updateProduct, deleteProduct, getOneProduct, getAllProduct, filterProduct}