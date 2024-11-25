import mongoose from "mongoose";

const DislikeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  guide_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', default: null },
  created_at: { type: Date, default: Date.now }
});

const Dislike = mongoose.model('Dislike', DislikeSchema);
export default Dislike;
