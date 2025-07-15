import mongoose from 'mongoose';

const { Schema } = mongoose;

const ThreadSchema = new Schema({
  email: String,
  threadId: String,
  completed: { type: Boolean, default: false },
});

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
