import { json } from "express";
import User from "../Models/UserModel.js";
import generateToken from "../Utils/generateToken.js";


export const userAuth = async (req,res) =>{

    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({success:false,messgae:"Please fill all the fields"})
    }

    try {
        const userExits = await User.findOne({email});
       
        if(userExits && (await userExits.matchPasswords(password))){
            generateToken(res, userExits._id);
            res.status(201).json({
                _id: userExits._id,
                email: userExits.email,
                password: userExits.password,
            });
        }else{
            res.status(404).json({success:false,message:"Invalid emial or password"})
        }

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export const createUser = async (req,res) =>{

    const {email,username,role,status,password} = req.body;

    if(!email || !password || !username || !role || !status){
        res.status(201).json({messgae:"Please enter all fields"});
    }

    try {
        const user = User.create({
            email,
            username,
            role,
            status,
            password,
        });
        if(user){
            res.status(200).json({success:true,message:"user created",
                _id:(await user)._id,
                email: (await user).email,
            });
        }else{
            res.status(400).json({success:false, message:"Failed to create user" });
        }
    } catch (error) {
        
    }
}


export const getUser = async (req,res) =>{
    
    try {
        const allusers = await User.find();
        if(allusers){
            res.status(200).json({success:true, message:"users", User:allusers})
        }else{
            res.status(200).json({success:false, message:"failed to get users"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).json({messgae:"server Error"})
    }
}

export const updateUser = async (req,res) =>{

    const {id} = req.params;
    const newUser = req.body;

    if(!newUser.email || !newUser.password){
        res.status(203).json({success:false,message:"All fields muust be filled"})
    }

    try {
        const wUser = await User.findByIdAndUpdate(id,newUser);
        if(wUser){
            res.status(200).json({success:false,messgae:"User updated", User:newUser});
        }else{
            res.status(200).json({success:false,messgae:"failed to update user"});
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }

}

export const deleteUser = async (req,res)=>{

    const {id} = req.params;

    if(!id){
        res.status(203).json({success:false,message:"INVALID USER ID"});
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if(deletedUser){
            res.status(200).json({success:true,message:"user deleted successfully", User: deletedUser});
        }else{
            res.status(401).json({success:false,message:"failed to delete user"});
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }
}