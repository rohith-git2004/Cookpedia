const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerController = async(req,res)=>{
    console.log("inside registerController");
    const {username,email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(409).json("User already exists!!! Please Login")
        }
        else{
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
                username,email,password:encryptedPassword
            })
            res.status(200).json(newUser) 
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

exports.loginController = async(req,res)=>{
    console.log("inside registerController");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if (existingUser) {
            const decryptPassword = await bcrypt.compare(password,existingUser.password)
            if (decryptPassword) {
                const token = jwt.sign({email,role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
            }
            else{
                res.status(409).json("Incorrect email or pasword")
            }
        }
        else{
            res.status(409).json("Invalid email !! Please register to continue") 
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// update user profile
exports.editUserPictureController = async(req,res)=>{
    console.log("inside editUserPictureController");
    const picture = req.file
    const email = req.payload
    try{
      const existingUser = await users.findOne({email})
      existingUser.picture = picture.filename 
      await existingUser.save()
      res.status(200).json(existingUser)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

// get all users
exports.getAllUserController = async(req,res)=>{
    console.log("inside getAllUserController");
    try{
      const allUser = await users.find({role:{$eq:"user"}})
      res.status(200).json(allUser)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
}

