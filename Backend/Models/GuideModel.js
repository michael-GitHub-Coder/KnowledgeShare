import mongoose from "mongoose";

const guideSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
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
    },
    comments: [{
        comment_id: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'Comment' 
        },
        user_id: {
             type: mongoose.Schema.Types.ObjectId, 
             ref: 'User', 
             required: true 
        },
        comment_text: {
             type: String, 
             required: true 
        }
      }]
},{
    timestamps: true
})

const Guide = mongoose.model("Guide",guideSchema);

export default Guide;