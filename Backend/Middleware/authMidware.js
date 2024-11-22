import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const protect = async (req, res, next) => {
    try {
       
        const token = req.cookies?.jwt; 
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: No token provided." });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(404).json({ message: "User not found." });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token, unauthorized.", error: error.message });
    }
};

export default protect;
