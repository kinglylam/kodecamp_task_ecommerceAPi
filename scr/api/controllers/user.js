const user = require("../models/user");


const { userValidation } = require("../validation/user");
const signup = async (req, res) => {
    try {
        const { error } = userValidation(req.body);
        if(error)
        return res.status(400).json({
            msg: error.details(0).message
        });
        
        let {firstname, lastname, email, password, confirmPassword} = req.body
        const emailExist = await user.findOne({ email });
        if (emailExist) {
            res.status(400).json({
                msg: "email already exist",
                success: false,
           });

        }

        const saltRounds =12
        password = await bcrypt.hash(password, saltRounds);
        const newUser = new user({
            firstname,
            lastname,
            email,
            password
        })
        await newUser.save();
        return res.status(201).json({
            msg: "new  user account created",
            success: true,
       });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: "failed to create user",
            success: false,
       });
    }
};


const getAllUsers = async (req, res) => {
    const users = await user.find({});
    res.status(200).json({ 
        success: true, 
        data: users });
  };
  
  const getUserById = async (req, res) => {
    const user = await user.findById(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ 
        success: true, 
        data: user });
  };
  
  const updateUser = async (req, res) => {
    const { firstName, lastName } = req.body;
    if (firstName && lastName) {
      const user = await user.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
      });
      if (!user) {
        throw new Error("something went wrong");
      }
      res.status(200).json({ 
          success: true, 
          data: user });
    } else {
      throw new Error("Invalid data");
    }
  };
  
  const deleteUser = async (req, res) => {
    const user = await user.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ 
        success: true, 
        data: user });
  };
module.exports = {signup, getAllUsers, getUserById, updateUser, deleteUser};
