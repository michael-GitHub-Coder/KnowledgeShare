import { json } from "express";
import User from "../Models/UserModel.js";
import generateToken from "../Utils/generateToken.js";


export const userAuth = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {

        const userExits = await User.findOne({ email });
        if(userExits){
            if(userExits.status === "Active"){

                if (await userExits.matchPasswords(password)) {
                    generateToken(res, userExits._id);
                    return res.status(200).json({
                        _id: userExits._id,
                        email: userExits.email,
                        username: userExits.username,
                        role: userExits.role,
                        password: userExits.password,
                    });
                }

            }else if(userExits.status === "Inactive"){
                return res.status(401).json({
                    message:"User account is Inactive"
                });
            }else if(userExits.status === "Suspended"){
                return res.status(401).json({
                    messgae:"User accocunt suspended, Contact Admin."
                });
            }
        }
       
        res.status(401).json({ success: false, message: "Invalid email or password" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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

export const logOutUser = async (req,res) =>{

    try {
        res.cookie("jwt","",{
            HttpOnly: true,
            expires: new Date(0),
        });
        res.status(200).json({message:"User loged out"})
    } catch (error) {
        res.status(500).json({message:error.message});
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
        return res.status(203).json({success:false,message:"All fields muust be filled"})
    }

    try {
        const wUser = await User.findByIdAndUpdate(id,newUser);
        if(wUser){
           return res.status(200).json({success:true,messgae:"User updated", User:newUser});
        }else{
            return res.status(404).json({success:false,messgae:"failed to update user"});
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

export const DeactivateUser = async (req,res) =>{

    const {id} = req.params;
    const user = req.body;

    if(!id){
        res.status(203).json({success:false,message:"INVALID USER ID"});
    }
    if(!user.status){
        res.status(203).json({success:false,message:"Please fill all the fields"});
    }

    try {
        const userStatusUpdate = await  User.findByIdAndUpdate(id,user);
        if(userStatusUpdate){
            res.status(200).json({success:true,message:"User diactivated"});
        }else{
            res.status(401).json({success:false,message:"failed to diactivate user"});
        }

    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }
}
export const activateUser = async (req,res) =>{

    const {id} = req.params;
    const user = req.body;

    if(!id){
        res.status(203).json({success:false,message:"INVALID USER ID"});
    }
    if(!user.status){
        res.status(203).json({success:false,message:"Please fill all the fields"});
    }

    try {
        const userStatusUpdate = await  User.findByIdAndUpdate(id,user);
       
        if(userStatusUpdate){
            res.status(200).json({success:true,message:"User account activated"});
        }else{
            res.status(401).json({success:false,message:"failed to activate user"});
        }

    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }
}

export const getUserByEmail = async (req,res) => {

    const {email} = req.body;

    if(!email){
        res.status(401).json({message:"Please fill all the fields"})
    }

    try {
        const allusers = await User.findOne({email});
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

export const suspendAccount = async (req,res) => {

    const {id} = req.params;
    const userData = req.body;
    
    if(!userData.status){
        res.status(200).json({message:"invalid status"});
    }

    try {
        const suspendUser = await User.findByIdAndUpdate(id,userData);
        if(suspendUser){
            res.status(200).json({success:true,message:"Account suspended"});
        }else{
            res.status(401).json({success:false,message:"failed to delete user"});
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }

}