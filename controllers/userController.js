const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const createToken =(user)=>{
    return jwt.sign({user}, process.env.SECRET, {
        expiresIn: '7d'
    });

}
require('dotenv').config();

module.exports.registerValiations = [
    body("name").not().isEmpty().trim().withMessage("name is required"),
    body("phone").isLength({max: 11}).not().isEmpty().trim().withMessage("Phone is required"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters required")


];


module.exports.register = async (req, res) => {
    const {name, phone, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});

    }

    try {
        const checkUser = await User.findOne({phone})
        if (checkUser) {
            return res.status(400).json({errors: [{msg: 'Email is already taken'}]});

        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                name,
                phone,
                password: hash,
            });

            const token = createToken(user);

            return res.status(200).json({msg: "your account has been created", token});

        } catch (error) {
            return res.status(500).json({errors: error});
        }

    } catch (error) {
        return res.status(500).json({errors: error});

    }

};

module.exports.LoginValiations = [
    body("phone").isLength({max: 11}).not().isEmpty().trim().withMessage("Phone is required"),
    body("password").not().isEmpty().withMessage("Password is required"),


];

module.exports.login = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {phone,password}=req.body;

    try{
        const user =await User.findOne({phone});
        if(user){
            const matched =await  bcrypt.compare(password,user.password);
            if(matched){
                const token =createToken(user);
                return res.status(200).json({msg:"you have login successfull",token});

            }else {
                res.status(401).json({errors:[{msg:"password is not correct "}]});

            }

        }else {
            res.status(404).json({errors:[{msg:"Email not found "}]});
        }

    }catch (error){
        return res.status(500).json({errors:error});
    }



};