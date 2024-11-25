const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true 
    },
  comment_id: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
       default: null 
    },
  guide_id: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Guide',
      default: null 
    },
  created_at: {
     type: Date, 
     default: Date.now
    }
});

const Like = mongoose.model('Like', LikeSchema);
export default Like;
