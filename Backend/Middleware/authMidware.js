import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js"


export const protect = async (req,res,next)=>{

    try {
        
        const token = req.cookie?.jwt;

        if(!token){
            res.status(401).json({message:"UnAuthorised access."})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");

        if(!req.user){
            res.status(404).json({message:"User not found"});
        }
        
        next();
        
    } catch (error) {
        res.status(401).json({message:"Invalid token,not authorised",error: error.message})
    }
}