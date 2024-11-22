import mongoose from "mongoose";

const guideSchema = mongoose.Schema({
    
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    media:{
        type:String,
    }
},{
    timestamps: true
})

const Guide = mongoose.model("Guide",guideSchema);

export default Guide;