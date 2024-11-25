import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    comment:{
        type:String,
    },
    like_ID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:Likes,
    }],
    dislike_ID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:Dislikes,
    }],
    User_ID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
    }],
    Guide_ID:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:Guide,
    }]
},{
    timestamps: true,
})

const Comments = mongoose.model("Comments",CommentsSchema);
export default Comments;