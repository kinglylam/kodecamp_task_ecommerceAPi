 const productModel = require("../models/product");
 
 const createProduct = async (req, res) => {
     try {
         
        const product = new productModel.create(...req.body) ;
        const savedProduct = await product.save();

        return res.status(200).json({
            msg: "product created successfully",
            product: savedProduct
        });

     } catch (error) {
        console.log(error); 
     }
 };
 const getAllProduct = async (req, res) => {
     try {
        const result = new productModel.find({});
        const savedResult = await result.save();
        return res.status(200).json({
            msg: " successful",
            product: savedResult
        });
          
     } catch (error) {
         console.log(error);
     }
};


const getOneProduct = async (req, res) => {
    const {id:_id} = req.params;
    const result=await productModel.findOne({_id});
    
    res.json({status:'success',data:result});
}

const updateProduct = async (req, res) => {
    const {id:_id} = req.params;
    const {name,price,description,category} = req.body;
    const result=await productModel.findOneAndUpdate({_id},{name,price,description,category},{new:true});
    
    res.json({status:'success',data:result});

}
const deleteProduct =async (req, res) => {
    const {id:_id} = req.params;
    const result=await productModel.findOneAndDelete({_id},{new:true});

    res.json({status:'success',data:result});
}
 module.exports = {createProduct, updateProduct, deleteProduct, getOneProduct, getAllProduct}