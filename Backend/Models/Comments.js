const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
   },
  comment_text: {
     type: String, 
     required: true 
    },
  likes: {
     type: Number, 
     default: 0
     },
  dislikes: {
     type: Number,
      default: 0
     },
  replies: [{
    user_id: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User',
          required: true
         },
    comment_text: {
         type: String,
          required: true
         },
    created_at: {
        type: Date,
         default: Date.now
     }
  }]
}, { 
    timestamps: true
 });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
