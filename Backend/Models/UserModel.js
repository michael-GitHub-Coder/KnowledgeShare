import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    
   try {
        if(!this.isModified("password")){
            next();
        }
        const salt =await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();

   } catch (error) {
    next(error)
   }

})

userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;