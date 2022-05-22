const joi = require("joi");
const { schema } = require("../models/user");
exports.userValidation = (user) => {
    const schema =joi.object({
        firstname:joi.string().min(2).max(50).required(),
        lastname:joi.string().min(2).max(50).required(),
        email:joi.string().min(2).max(120).required(),
        password:joi.string().min(2).max(120).required(), 
        confirmPassword:joi.string().required().valid(joi.ref('password')),
        }).unknown();

        return schema.validate(user)
}
